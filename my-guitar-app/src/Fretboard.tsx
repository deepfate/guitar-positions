// Fretboard.jsx - Component files get CapitalLettersInTheirNames
// This is for UI / Display.
// fretboard.js is the fretboard object itself.
// berkleeDictionary.js is where we will keep track of position types and their root note definitions.

import React, { useMemo, useState, useRef } from 'react';
import { generateFretboard, FretNode } from './util/fretboard'; // Adjust path as needed
import { berkleeDictionary, rootDefinitions, FingeringKey } from './util/berkleeDictionary';
//import { Scale, Note } from '@tonaljs/tonal';
import './Fretboard.css';
import ControlPanel from './ControlPanel';

/**
 * TODO:
 * - Add fret numbers and a toggle
 * - Add toggle for showing all notes
 * - Add toggle for highlighting all roots, instead of just the lowest
 * - Add toggle for enharmonic, so user can choose to be shown either sharps or flats
 * - Add option for what is shown in the fingering dot. Either finger number, or note name, or nothing.
 * - Create side menu or something to keep buttons and options and stuff
 * - Extend position slider
 * - Extend fretboard
 * - Circle of Fifths picker
 * - 
 * - Note Filtering:
 * -    Triads, Scales, Modes, Chords
 * - 
 * - iRealPro Functionality
 * -    * Should be able to read iRealPro charts and move the position box dynamically as best as it can
 * -    * Position Lock feature would be nice
 * -    * Position Box movement preference would be nice. Let user set "Ascending/Descending" and position box changes every bar
 * -
 * - Circle of Fifth
 * -    * Let users drag a handle around Circle of Fifths. Circle updates would trigger either position updates, key updates, type updates, etc
 * -
 * - Staff and Notation
 * -    * Let users toggle a staff
 * -    * Let users import sheet music
 * -    * Let users import/export midi
 * - 
 * - Position Box:
 * -    * Toggle show/hide actual box around position
 * -    * Toggle showing stretches in dots. Example, on index stretch, if this is enabled, show s1. Else, show 1.
 * -    * Toggle left hand finger numbers or letters. Either:
 * -    *   1, 2, 3, 4 (with or without 1s, 4s)
 * -    *       or
 * -    *   i, m, r, p (with or without is, ps)
 * - 
 * - Code Stuff:
 * -    * Pull things out into more files for better organization/readability.
 * - 
 **/

/** Defines which frets should have a single fret dot.
 *  The "as const" can be uncommented should you want to make these immutable.
 * 
 *  These inlay arrays should go into fretboard.ts later, once the UI options for the user are developed.
 */
const singleInlays = [1, 3, 5, 9, 13, 17]; // as const

/** Defines which frets should have a double fret dot.
 *  The "as const" can be uncommented should you want to make these immutable.
 * 
 *  These inlay arrays should go into fretboard.ts later, once the UI options for the user are developed.
 */
const doubleInlays = [7, 12, 15]; // as const

/**
 * @remarks Exporting because we use this in ControlPanel.tsx, but would eventually like to pull this out. idk.
 * 
 * 'imrp' as in, Index, Middle, Ring, Pinky
 */
export type DotDisplayOption = 'fingers' | 'imrp' | 'notes' | 'numerals' | 'none'; // 

/** */
type ActiveNote = {
    finger: number;
    isRoot: boolean;
}

/**
 * The main interactive Fretboard UI.
 * Handles rendering of strings, frets, inlay markers, active scale shapes / position.
 * @returns 
 */
export default function Fretboard() {
    // Generate the fretboard data once. 
    // If we add alternate tunings later, we will add the tuning state to the dependency array [].
    const fretboardData = useMemo<FretNode[][]>(() => generateFretboard(), []);

    // --- STATES: Defaults --- //
    const [position, setPosition] = useState(2); // Default to 2nd Position
    const [fingeringType, setFingeringType] = useState<FingeringKey>('type1');
    const [isKeyLocked, setIsKeyLocked] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [dotDisplay, setDotDisplay] = useState<DotDisplayOption>('fingers');

    // --- STATES: Position Box --- //
    const [showPositionBox, setShowPositionBox] = useState(true);
    const [isDragging, setisDragging] = useState(false);
    const dragStartX = useRef(0);
    const dragStartPos = useRef(0);

    // --- LOGIC: MAP DICTIONARY TO FRETBOARD --- // 
    const activeShape = berkleeDictionary.major[fingeringType];

    // --- FORWARD LOOKUP --- 
    //    Look at root definition of the type, then use that to check the fretboard at that string to get fret. 
    // 1. Create fast lookup table for stencil.
    /**
     * 
     */
    const activeNotesLookup = useMemo(() => {
        //const lookup = {};
        const lookup: Record<string, ActiveNote> = {};
        const rootDef = rootDefinitions[fingeringType];

        activeShape.forEach(stringData => {
            stringData.notes.forEach(note => {
                // Calculate absolute fret on the guitar neck
                const absoluteFret = position + note.offset;

                // Check if this specific note is the root of the shape
                const isRoot = stringData.string === rootDef.string && note.offset === rootDef.offset;

                // Create a new key in the lookup dictionary 
                lookup[`${stringData.string}-${absoluteFret}`] = {
                    finger: note.finger,
                    isRoot: isRoot
                };
            });
        });
        return lookup;

    }, [activeShape, position, fingeringType]);

    // 2. Calculate the actual key being played to display to the user
    /**
     * 
     */
    const currentKeyName = useMemo(() => {
        const rootDef = rootDefinitions[fingeringType];
        const rootStringData = fretboardData[rootDef.string];

        if (!rootStringData) return "";

        const rootNoteData = rootStringData.find(f => f.fret === position + rootDef.offset);
        return rootNoteData ? rootNoteData.pitchClass : "";
    }, [fretboardData, position, fingeringType]);

    // --- POSITION CHANGING / KEY LOCKING ALGORITHM --- //
    // --- REVERSE LOOKUP --- //
    // --- This function will fire everytime the user moves the slider. --- //
    /**
     * 
     * @param newPosition 
     * @returns 
     */
    const handlePositionChange = (newPosition: number) => {
        if (!isKeyLocked) {
            setPosition(newPosition);
            return;
        }

        // --- KEY LOCKING ALGORITHM --- //
        // We need to know what key we are currently trying to lock.
        // Loop through the types in rootDefinitions, using Object.entries()
        //      For each type, calculate its absolute fret (newPosition + offset).    
        //      Compare pitchClass property. If current fret's note name is our target,
        //          Update the state with the string key (type 1, type2, etc) and exit function.
        //          Else, loop will finish without finding a match, never updating the state. This means the position box will ignore the slider.
        const targetKey = currentKeyName;

        for (const [typeKey, typeData] of Object.entries(rootDefinitions)) {
            const absoluteFret = newPosition + typeData.offset;
            if (absoluteFret >= 0 && absoluteFret < fretboardData[0].length) { // Safety Check: Ensures the fret exists on our fretboard before checking it
                const fretNode = fretboardData[typeData.string][absoluteFret];
                if (fretNode.pitchClass === targetKey) {
                    setFingeringType(typeKey as FingeringKey);
                    setPosition(newPosition);
                    return;
                }
            }
        }
    };

    // --- POSITION BOX DRAGGING --- //
    /**
     * 
     * @param e 
     */
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        // Only start dragging if user clicked inside active box.
        if ((e.target as HTMLElement).closest('.active-box')) {
            setisDragging(true); // This triggers a render so our CSS cursor can change
            dragStartX.current = e.clientX;
            dragStartPos.current = position;
            e.currentTarget.setPointerCapture(e.pointerId); // This tells the browser to keep sending mouse events even if they drag outside of the box after the initial pointer down.
            //(e.target as HTMLElement).setPointerCapture(e.pointerId); <--| This would also work, but using currentTarget is the "React" way.
        }
    };

    /**
     * 
     * @param e 
     */
    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (isDragging) {
            setisDragging(false);
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    };

    /**
     * 
     * @param e 
     * @returns 
     */
    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        // Get width of one fret
        const fretboardWidth = e.currentTarget.offsetWidth;
        const fretWidth = fretboardWidth / 24; // Hardcoding fret count for now, but change this to pull from the fretboard object later

        const pixelsMoved = e.clientX - dragStartX.current;

        // Divide pixelsMoved by fretWidth, round it, and add it to dragStartPos.current!
        let newPosition = dragStartPos.current + Math.round(pixelsMoved / fretWidth);

        // Clamp boundaries so user can't drag box off of the fretboard
        if (newPosition < 1) newPosition = 1;
        if (newPosition > 24) newPosition = 24;

        // Then call handlePositionChange(newPosition)...
        handlePositionChange(newPosition);
    }

    // --- RENDER THE FRETBOARD --- //
    return (
        <div className="fretboard-wrapper">
            {/* --- UI CONTROLS --- */}
            <div className="dashboard-layout">
                <button
                    className="menu-toggle"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? 'Hide Controls' : 'Show Controls'}
                </button>

                <ControlPanel
                    isSidebarOpen={isSidebarOpen}

                    isKeyLocked={isKeyLocked}
                    setIsKeyLocked={setIsKeyLocked}

                    currentKeyName={currentKeyName}

                    dotDisplay={dotDisplay}
                    setDotDisplay={setDotDisplay}

                    fingeringType={fingeringType}
                    setFingeringType={setFingeringType}

                    position={position}
                    handlePositionChange={handlePositionChange}

                    showPositionBox={showPositionBox}
                    setShowPositionBox={setShowPositionBox}
                />

                {/* --- FRETBOARD UI --- */}
                <div className="fretboard-container"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                >
                    {/* --- Map over all strings --- */}
                    {fretboardData.slice().reverse().map((stringNotes) => (
                        <div key={`string-${stringNotes[0].stringIndex}`} className="string-row">
                            {/* --- Map over all frets on this string --- */}
                            {stringNotes.map((fretData) => {
                                // --- Fret Inlay Check --- //
                                // --- Single: Only add inlay when on D string. Nudge inlay dot later --- //
                                const isSingleInlay = singleInlays.includes(fretData.fret) && fretData.stringIndex === 2;

                                // --- Double: Only add inlay when on either A or B string. Nudge inlay dot later --- //
                                const isDoubleInlay = doubleInlays.includes(fretData.fret) && (fretData.stringIndex === 1 || fretData.stringIndex === 4);

                                // Check lookup table to see if this fret should have a dot
                                const activeNote = activeNotesLookup[`${fretData.stringIndex}-${fretData.fret}`];

                                // "Home Base" for any Berklee position is exactly 4 frets wide (offset 0 to 3)
                                const notInPositionBox = fretData.fret < position || fretData.fret > position + 3;

                                // Checking for position box
                                const isInPositionBox = !notInPositionBox;

                                return (
                                    <div
                                        key={fretData.note}
                                        className={`fret
                                            ${fretData.fret === 0 ? 'nut' : fretData.fret === 11 ? 'octave' : ''}
                                            ${notInPositionBox && fretData.fret !== 0 ? 'out-of-position' : ''}
                                            ${showPositionBox && isInPositionBox && fretData.fret !== 0 ? 'active-box' : ''}
                                            `}
                                    >
                                        {/* Render inlay dots */}
                                        {(isSingleInlay || isDoubleInlay) && (
                                            //<div className='inlay-dot'></div>
                                            <div className={`inlay-dot ${isSingleInlay ? 'single' : 'double'}`}></div>
                                        )}

                                        {/* Render position dots */}
                                        {activeNote && (
                                            <div className={`note-dot ${activeNote.isRoot ? 'root' : ''}`}>
                                                {dotDisplay === 'fingers' && activeNote.finger}
                                                {dotDisplay === 'notes' && fretData.pitchClass}
                                                {/* Finish this later: dotDisplay === 'dotDisplayRoman' &&  */}
                                                {/* And if dotDisplay is none, it renders nothing inside the dot div! */}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}