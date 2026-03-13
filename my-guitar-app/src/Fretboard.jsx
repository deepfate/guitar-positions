import React, { useMemo, useState } from 'react';
import { generateFretboard } from './util/Fretboard'; // Adjust path as needed
import { Scale, Note } from '@tonaljs/tonal';
import './Fretboard.css';

export default function Fretboard() {
    // Generate the fretboard data once. 
    // If we add alternate tunings later, we will add the tuning state to the dependency array [].
    const fretboardData = useMemo(() => generateFretboard(), []);

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