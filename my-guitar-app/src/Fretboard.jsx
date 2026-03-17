import React, { useMemo, useState } from 'react';
import { generateFretboard } from './util/Fretboard'; // Adjust path as needed
import { berkleeDictionary } from './util/berkleeDictionary';
//import { Scale, Note } from '@tonaljs/tonal';
import './Fretboard.css';

export default function Fretboard() {
    // Generate the fretboard data once. 
    // If we add alternate tunings later, we will add the tuning state to the dependency array [].
    const fretboardData = useMemo(() => generateFretboard(), []);

    // --- STATE FOR EXPLORATION MODE ---
    const [position, setPosition] = useState(2); // Default to 2nd Position
    const [fingeringType, setFingeringType] = useState(type1);

    // --- LOGIC: MAP DICTIONARY TO FRETBOARD ---
    const activeShape = berkleeDictionary.major[fingeringType];

    // 1. Create fast lookup table for stencil
    const activeNoteLookup = useMemo(() => {
        const lookup = {};
        
        // Hardcode root locations for each type
        const rootDefinitions = {
            type1: {string: 1, offset: 1}, // A String, finger 2
            type2: {string: 0, offset: 1}, // Low E, finger 2
            type3: {string: 1, offset: 3}, // A String, finger 4
            type4: {string: 0, offset: 3} // Low E String, finger 4
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
                type1: {string: 1, offset: 1}, // A String, finger 2
                type2: {string: 0, offset: 1}, // Low E, finger 2
                type3: {string: 1, offset: 3}, // A String, finger 4
                type4: {string: 0, offset: 3} // Low E String, finger 4
            };
            const rootDef = rootDefinitions[fingeringType];
            const rootStringData = fretboardData[rootDef.string];

            if (!rootStringData) return "";

            const rootNoteData = rootStringData.find(f => f.fret === position + rootDef.offset);
            return rootNoteData ? rootNoteData.pitchClass : "";
        }, [fretboardData, position, fingeringType]);

        return (
            <div className = "fretboard-wrapper">
                {/* --- UI CONTROLS --- */}
                <div className="controls">
                    <select value = {fingeringType} onChange={(e) => setFingeringType(e.target.value)}>
                        <option value = "type1">Type 1 (Root on 5th String, FInger 2)</option>
                        <option value = "type2">Type 2 (Root on 6th String, FInger 2)</option>
                        <option value = "type3">Type 3 (Root on 5th String, FInger 4)</option>
                        <option value = "type4">Type 4 (Root on 6th String, FInger 4)</option>
                    </select>

                    <select value={position} onChange={(e) => setPosition(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(p => (
                            <option key={p} value={p}>Position {p === 1 ? 'I' : p === 2 ? 'II' : p === 3 ? 'III' : p === 4 ? 'IV' : p === 5 ? 'V' : p === 6 ? 'VI' : p === 7 ? 'VII' : p === 8 ? 'VIII' : p === 9 ? 'IX' : p === 10 ? 'X' : p === 11 ? 'XI' : p === 12 ? 'XII' }</option>
                        ))}
                    </select>


                </div>

            </div>
        );



    // 2. Use 'chroma' (a number 0-11 representing pitch class) to avoid C# vs Db spelling bugs
    const scaleChromas = activeScale.notes.map(n => Note.get(n).chroma);
    const rootChroma = Note.get(rootNote).chroma;

    return (
        <div className="fretboard-wrapper">

            {/* --- UI CONTROLS --- */}
            <div className="controls">
                <select value={rootNote} onChange={(e) => setRootNote(e.target.value)}>
                    {['C', 'G', 'D', 'A', 'E', 'B', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'].map(n => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>

                <select value={scaleType} onChange={(e) => setScaleType(e.target.value)}>
                    <option value="major">Major</option>
                    <option value="minor">Natural Minor</option>
                    <option value="dorian">Dorian</option>
                    <option value="mixolydian">Mixolydian</option>
                </select>

                <select value={position} onChange={(e) => setPosition(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(p => (
                        <option key={p} value={p}>Position {p}</option>
                    ))}
                </select>
            </div>

            {/* --- FRETBOARD --- */}
            <div className="fretboard-container">
                {fretboardData.slice().reverse().map((stringNotes) => (
                    <div key={`string-${stringNotes[0].stringIndex}`} className="string-row">

                        {stringNotes.map((fretData) => {
                            // --- APPLY VISUAL FILTERS ---
                            const noteChroma = Note.get(fretData.pitchClass).chroma;
                            const isScaleTone = scaleChromas.includes(noteChroma);
                            const isRoot = noteChroma === rootChroma;

                            // Algorithmic Position Box: Assumes a 4-fret span for now.
                            // We will replace this with your strict Berklee dictionary later!
                            const isInPositionBox = fretData.fret >= position && fretData.fret <= position + 3;

                            return (
                                <div
                                    key={fretData.note}
                                    className={`fret ${fretData.fret === 0 ? 'nut' : ''} ${!isInPositionBox && fretData.fret !== 0 ? 'out-of-position' : ''}`}
                                >
                                    {/* Only render the dot if it belongs to the selected scale */}
                                    {isScaleTone && (
                                        <div className={`note-dot ${isRoot ? 'root' : ''} ${!isInPositionBox ? 'ghost-dot' : ''}`}>
                                            {fretData.pitchClass}
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