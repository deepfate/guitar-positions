// Fretboard.jsx
// This is for UI / Display.
// Fretboard.js is the fretboard object itself.
// berkleeDictionary.js is where we will keep track of position types and their root note definitions.

import React, { useMemo, useState } from 'react';
import { generateFretboard } from './util/Fretboard.js'; // Adjust path as needed
import { berkleeDictionary, rootDefinitions } from './util/berkleeDictionary.js';
//import { Scale, Note } from '@tonaljs/tonal';
import './Fretboard.css';
import ControlPanel from './ControlPanel.jsx';


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
 * - Note Filtering: Triads, Scales, Modes, Chords
 * - 
 * - Position Box:
 * -    * Toggle show/hide actual box around position
 * -    * Toggle showing stretches in dots. Example, on index stretch, if this is enabled, show s1. Else, show 1.
 * -    * Toggle left hand finger numbers or letters. Either:
 * -    * 1, 2, 3, 4 (with or without 1s, 4s)
 * -    *     or
 * -    * i, m, r, p (with or without is, ps)
 * - 
 **/
const singleInlays = [1, 3, 5, 9, 13, 17];
const doubleInlays = [7, 12, 15];


export default function Fretboard() {
    // Generate the fretboard data once. 
    // If we add alternate tunings later, we will add the tuning state to the dependency array [].
    const fretboardData = useMemo(() => generateFretboard(), []);

    // --- STATE FOR EXPLORATION MODE ---
    const [position, setPosition] = useState(2); // Default to 2nd Position
    const [fingeringType, setFingeringType] = useState('type1');
    const [isKeyLocked, setIsKeyLocked] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [dotDisplay, setDotDisplay] = useState('dotDisplayFingers')


    // --- LOGIC: MAP DICTIONARY TO FRETBOARD ---
    const activeShape = berkleeDictionary.major[fingeringType];

    


    // --- FORWARD LOOKUP ---
    //    Look at root definition of the type, then use that to check the fretboard at that string to get fret. 
    // 1. Create fast lookup table for stencil.
    const activeNotesLookup = useMemo(() => {
        const lookup = {};
        const rootDef = rootDefinitions[fingeringType];

        activeShape.forEach(stringData => {
            stringData.notes.forEach(note => {
                // Calculate absolute fret on the guitar neck
                const absoluteFret = position + note.offset;

                // Check if this specific note is the root of the shape
                const isRoot = stringData.string === rootDef.string && note.offset === rootDef.offset;

                lookup[`${stringData.string}-${absoluteFret}`] = {
                    finger: note.finger,
                    isRoot: isRoot
                };
            });
        });
        return lookup;

    }, [activeShape, position, fingeringType]);

    // 2. Calculate the actual key being played to display to the user
    const currentKeyName = useMemo(() => {
        const rootDef = rootDefinitions[fingeringType];
        const rootStringData = fretboardData[rootDef.string];

        if (!rootStringData) return "";

        const rootNoteData = rootStringData.find(f => f.fret === position + rootDef.offset);
        return rootNoteData ? rootNoteData.pitchClass : "";
    }, [fretboardData, position, fingeringType]);


    // --- REVERSE LOOKUP ---
    // --- This function will fire everytime the user moves the slider.
    // --- 
    // --- POSITION CHANGING / KEY LOCKING ALGORITHM ---
    const handlePositionChange = (newPosition) => {
        if (!isKeyLocked) {
            // If not locked, just move the position box. Shape stays the same, keys change automatically.
            setPosition(newPosition);
            return;
        }

        // --- KEY LOCKING ALGORITHM ---
        // Step 1: We need to know what key we are currently trying to lock.
        const targetKey = currentKeyName;

        // Step 2: Loop through the types in rootDefinitions, using Object.entries()
        for (const [typeKey, typeData] of Object.entries(rootDefinitions)) {
            // For each type, calculate its absolute fret (newPosition + offset).
            const absoluteFret = newPosition + typeData.offset;

            // Safety Check: Ensures the fret exists (0 - 22) before checking it
            if (absoluteFret >= 0 && absoluteFret < fretboardData[0].length) {
                const fretNode = fretboardData[typeData.string][absoluteFret];

                // Compare pitchClass property
                if (fretNode.pitchClass === targetKey) {
                    // Update the state with the string key (type 1, type2, etc)
                    setFingeringType(typeKey);
                    setPosition(newPosition);

                    // Exit the handlePositionChange function
                    return;
                }
            }
        }
        // Step 6: If the loop finishes and finds no match, the code ends here.
        // The state never updates, meaning the position box ignores the slider.
    };

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
                    
                    dotDisplay={dotDisplay}
                    setDotDisplay={setDotDisplay}
                    
                    fingeringType={fingeringType}
                    setFingeringType={setFingeringType}
                    
                    currentKeyName={currentKeyName}

                    position={position}
                    handlePositionChange={handlePositionChange}
                />
                
                {/* --- FRETBOARD UI --- */}
                <div className="fretboard-container">
                    {/* --- Map over all strings --- */}
                    {fretboardData.slice().reverse().map((stringNotes) => (
                        <div key={`string-${stringNotes[0].stringIndex}`} className="string-row">
                            {/* --- Map over all frets on this string --- */}
                            {stringNotes.map((fretData) => {
                                // --- Fret Inlay Check --- //
                                // --- Single: Only add inlay when on D string. Nudge inlay dot later --- //
                                const isSingleInlay = singleInlays.includes(fretData.fret) && fretData.stringIndex === 2;

                                // --- Double: Only add inlay when on either A or B string. Nudge inlay dot later --- //
                                const isDoubleInlay = doubleInlays.includes(fretData.fret) && (fretData.stringIndex === 1 || fretData.stringIndex === 4 );

                                // Check lookup table to see if this fret should have a dot
                                const activeNote = activeNotesLookup[`${fretData.stringIndex}-${fretData.fret}`];

                                // "Home Base" for any Berklee position is exactly 4 frets wide (offset 0 to 3)
                                const notInPositionBox = fretData.fret < position || fretData.fret > position + 3;

                                return (
                                    <div
                                        key={fretData.note}
                                        className={`fret ${fretData.fret === 0 ? 'nut' : fretData.fret === 11 ? 'octave' : ''} ${notInPositionBox && fretData.fret !== 0 ? 'out-of-position' : ''}`}
                                    >
                                        {/* Render inlay dots */}
                                        {(isSingleInlay || isDoubleInlay) && (
                                            //<div className='inlay-dot'></div>
                                            <div className={`inlay-dot ${isSingleInlay ? 'single' : 'double'}`}></div>
                                        )}

                                        {/* Render position dots */}
                                        {activeNote && (
                                            <div className={`note-dot ${activeNote.isRoot ? 'root' : ''}`}>
                                                {dotDisplay === 'dotDisplayFingers' && activeNote.finger}
                                                {dotDisplay === 'dotDisplayNote' && fretData.pitchClass}
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