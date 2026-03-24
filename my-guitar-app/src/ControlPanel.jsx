import React from "react";

// Catch the props inside the parenthesis using destructuring!
// Because the React state lives in Fretboard.jsx, we have to hand the state related variables and functions down.
// These variables/functions are referred to as Props.
export default function ControlPanel({
    isSidebarOpen,
    isKeyLocked,
    setIsKeyLocked,
    fingeringType,
    setFingeringType,
    currentKeyName,
    position,
    handlePositionChange
}) {
    return (
        <div className={`side-panel ${!isSidebarOpen ? 'closed' : ''}`}>
            <h3>Controls</h3>
            {/* 1. Move Lock Key Checkbox here. */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'black' }}>
                <input
                    type="checkbox"
                    checked={isKeyLocked}
                    onChange={(e) => setIsKeyLocked(e.target.checked)}
                />
                Lock Key
            </label>

            {/* 2. Move fingering type dropdown here */}
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

            <h4 className='key-display-text'>
                Key: {currentKeyName} Major
            </h4>


            {/* 3. Move position slider here */}
            <input
                type="range"
                min="1"
                max="20"
                value={position}
                onChange={(e) => handlePositionChange(Number(e.target.value))}
            />
            <span style={{ color: 'Black' }}>Pos: {position}</span>

            <select value={position} onChange={(e) => setPosition(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(p => (
                    <option key={p} value={p}>
                        Position {p === 1 ? 'I' : p === 2 ? 'II' : p === 3 ? 'III' : p === 4 ? 'IV' : p === 5 ? 'V' :
                            p === 6 ? 'VI' : p === 7 ? 'VII' : p === 8 ? 'VIII' : p === 9 ? 'IX' : p === 10 ? 'X' :
                                p === 11 ? 'XI' : p === 12 ? 'XII' : p === 13 ? 'XIII' : p === 14 ? 'XIV' : p === 15 ? 'XV' :
                                    p === 16 ? 'XVI' : p === 17 ? 'XVII' : p === 18 ? 'XVIII' : p === 19 ? 'XIX' : 'XX'}
                    </option>
                ))}
            </select>

            {/* Misc settings to be implemented later */}
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
        </div>
    );
}


