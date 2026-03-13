import React, { useMemo } from 'react';
import { generateFretboard } from './util/Fretboard'; // Adjust path as needed
import './Fretboard.css';

export default function Fretboard() {
    // Generate the fretboard data once. 
    // If we add alternate tunings later, we will add the tuning state to the dependency array [].
    const fretboardData = useMemo(() => generateFretboard(), []);

    return (
        <div className="fretboard-wrapper">
            <h2>Berklee Practice Fretboard</h2>

            <div className="fretboard-container">
                {/* We slice and reverse so we don't mutate the original array, putting High E on top */}
                {fretboardData.slice().reverse().map((stringNotes) => (

                    <div key={`string-${stringNotes[0].stringIndex}`} className="string-row">

                        {stringNotes.map((fretData) => (
                            <div
                                key={fretData.note}
                                className={`fret ${fretData.fret === 0 ? 'nut' : ''}`}
                            >
                                {/* For now, we are rendering ALL notes. Later, we will conditionally render this dot! */}
                                <div className="note-dot">
                                    {fretData.pitchClass}
                                </div>
                            </div>
                        ))}

                    </div>

                ))}
            </div>
        </div>
    );
}