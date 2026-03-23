import React, { useMemo, useState } from 'react';
import { generateFretboard } from './util/Fretboard.js'; // Adjust path as needed
import { berkleeDictionary } from './util/berkleeDictionary.js';
//import { Scale, Note } from '@tonaljs/tonal';
import './Fretboard.css';

/**
 * TODO:
 * - Add fret numbers and a toggle
 * - Add toggle for showing all notes
 * - Create side menu or something to keep buttons and options and stuff
 * - Extend position slider
 * - Extend fretboard
 * - 
 * - 
 * - 
 * - 
 **/



export default function Fretboard() {
    // Generate the fretboard data once. 
    // If we add alternate tunings later, we will add the tuning state to the dependency array [].
    const fretboardData = useMemo(() => generateFretboard(), []);

    // --- STATE FOR EXPLORATION MODE ---
    const [position, setPosition] = useState(2); // Default to 2nd Position
    const [fingeringType, setFingeringType] = useState('type1');
    const [isKeyLocked, setIsKeyLocked] = useState(false);

    // --- LOGIC: MAP DICTIONARY TO FRETBOARD ---
    const activeShape = berkleeDictionary.major[fingeringType];

    // --- FORWARD LOOKUP ---
    //    Look at root definition of the type, then use that to check the fretboard at that string to get fret. 
    // 1. Create fast lookup table for stencil.
    const activeNotesLookup = useMemo(() => {
        const lookup = {};

        // Hardcode root locations for each type
        const rootDefinitions = {
            type1: { string: 1, offset: 1 },   //     A String, finger 2
            type1A: { string: 0, offset: -1 }, // Low E String, finger 1 
            type1B: { string: 1, offset: -1 }, //     A String, finger 1 
            type1C: { string: 2, offset: -1 }, //     D String, finger 1
            type1D: { string: 0, offset: 2 },  // Low E String, finger 3

            type2: { string: 0, offset: 1 },   // Low E string, finger 2
            type3: { string: 1, offset: 3 },   //     A String, finger 4

            type4: { string: 0, offset: 3 },   // Low E String, finger 4
            type4A: { string: 2, offset: 0 },  //     D String, finger 1 
            type4B: { string: 1, offset: 0 },  //     A String, finger 1
            type4C: { string: 0, offset: 0 },  // Low E String, finger 1
            type4D: { string: 1, offset: 2 },  //     A String, finger 3
        }

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
        const rootDefinitions = {
            type1: { string: 1, offset: 1 },   //     A String, finger 2
            type1A: { string: 0, offset: -1 }, // Low E String, finger 1 
            type1B: { string: 1, offset: -1 }, //     A String, finger 1 
            type1C: { string: 2, offset: -1 }, //     D String, finger 1
            type1D: { string: 0, offset: 2 },  // Low E String, finger 3

            type2: { string: 0, offset: 1 },   // Low E string, finger 2
            type3: { string: 1, offset: 3 },   //     A String, finger 4

            type4: { string: 0, offset: 3 },   // Low E String, finger 4
            type4A: { string: 2, offset: 0 },  //     D String, finger 1 
            type4B: { string: 1, offset: 0 },  //     A String, finger 1
            type4C: { string: 0, offset: 0 },  // Low E String, finger 1
            type4D: { string: 1, offset: 2 },  //     A String, finger 3
        }
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
        // Hint  : You already have a variable holding the current key from our Forward Lookup!
        const targetKey = currentKeyName;

        // Step 2: Define where the roots live for all types.
        // This was used in useMemo earlier and can be reused here.
        // Pretty sure this isnt needed??? Should currentKeyName have this already?
        const rootDefinitions = {
            type1: { string: 1, offset: 1 },   // A String, finger 2
            type1A: { string: 0, offset: -1 }, // E String, finger 1 
            type1B: { string: 1, offset: -1 }, // A String, finger 1 
            type1C: { string: 2, offset: -1 }, // D String, finger 1
            type1D: { string: 0, offset: 2 },  // E String, finger 3

            type2: { string: 0, offset: 1 },   // Low E, finger 2
            type3: { string: 1, offset: 3 },   //     A String, finger 4

            type4: { string: 0, offset: 3 },   // Low E String, finger 4
            type4A: { string: 2, offset: 0 },  //     D String, finger 1 
            type4B: { string: 1, offset: 0 },  //     A String, finger 1
            type4C: { string: 0, offset: 0 },  // Low E String, finger 1
            type4D: { string: 1, offset: 2 },  //     A String, finger 3
        }

        // Step 3: Loop through the 4 types in rootDefinitions, using Object.entries()
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
            <div className="controls">

                {/* --- KEY LOCK TOGGLE --- */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'black' }}>
                    <input
                        type="checkbox"
                        checked={isKeyLocked}
                        onChange={(e) => setIsKeyLocked(e.target.checked)}
                    />
                    Lock Key
                </label>

                {/* --- Various Display Options for User to Set --- */}
                <div style={{ border: 'dotted' }} className="fretboardDisplayToggles">
                    Fretboard Display Options
                    <input
                        type="checkbox"
                    // checked = {isFingeringDots}
                    // onChange={(e) => setIsFingeringDots(e.target.checked)}
                    />
                    Show Fingerings on Dots

                    <select value="positionBoxView">
                        <option value="positionBoxSolid">Solid</option>
                        <option value="positionBoxSolid">Dotted</option>
                        <option value="positionBoxSolid">Hide</option>
                    </select>
                    Position Box
                </div>

                {/* --- FINGERING TYPE SELECTION --- */}
                <select value={fingeringType} onChange={(e) => setFingeringType(e.target.value)}>
                    <option value="type1">Type 1 (Root on 5th String, Finger 2)</option>
                    <option value="type1A">Type 1A (Root on 6th String, Finger 1)</option>
                    <option value="type1B">Type 1B (Root on 5th String, Finger 1)</option>
                    <option value="type1C">Type 1C (Root on 4th String, Finger 1)</option>
                    <option value="type1D">Type 1D (Root on 6th String, Finger 3)</option>
                    <option value="type2">Type 2 (Root on 6th String, Finger 2)</option>
                    <option value="type3">Type 3 (Root on 5th String, Finger 4)</option>
                    <option value="type4">Type 4 (Root on 6th String, Finger 4)</option>
                    <option value="type4A">Type 4A (Root on 4th String, Finger 1)</option>
                    <option value="type4B">Type 4B (Root on 5th String, Finger 1)</option>
                    <option value="type4C">Type 4C (Root on 6th String, Finger 1)</option>
                    <option value="type4D">Type 4D (Root on 5th String, Finger 3)</option>
                </select>

                {/* --- POSITION SLIDER --- */}
                <input
                    type="range"
                    min="1"
                    max="12"
                    value={position}
                    onChange={(e) => handlePositionChange(Number(e.target.value))}
                />
                <span style={{ color: 'Black' }}>Pos: {position}</span>

                <select value={position} onChange={(e) => setPosition(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(p => (
                        <option key={p} value={p}>Position {p === 1 ? 'I' : p === 2 ? 'II' : p === 3 ? 'III' : p === 4 ? 'IV' : p === 5 ? 'V' : p === 6 ? 'VI' : p === 7 ? 'VII' : p === 8 ? 'VIII' : p === 9 ? 'IX' : p === 10 ? 'X' : p === 11 ? 'XI' : 'XII'}</option>
                    ))}
                </select>
            </div>

            <h3 className='key-display-text'>
                Key: {currentKeyName} Major
            </h3>

            {/* --- FRETBOARD --- */}
            <div className="fretboard-container">
                {fretboardData.slice().reverse().map((stringNotes) => (
                    <div key={`string-${stringNotes[0].stringIndex}`} className="string-row">
                        {stringNotes.map((fretData) => {
                            // Check lookup table to see if this fret should have a dot
                            const activeNote = activeNotesLookup[`${fretData.stringIndex}-${fretData.fret}`];

                            // "Home Base" for any Berklee position is exactly 4 frets wide (offset 0 to 3)
                            //const isInPositionBox = fretData.fret >= position && fretData.fret <= position + 3;
                            const notInPositionBox = fretData.fret < position || fretData.fret > position + 3;
                            return (
                                <div
                                    key={fretData.note}
                                    className={`fret ${fretData.fret === 0 ? 'nut' : ''} ${notInPositionBox && fretData.fret !== 0 ? 'out-of-position' : ''}`}
                                >
                                    {/* Render the finger number inside the dot */}
                                    {activeNote && (
                                        <div className={`note-dot ${activeNote.isRoot ? 'root' : ''}`}>
                                            {activeNote.finger}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}