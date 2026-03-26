import { FingeringKey } from './util/berkleeDictionary';

interface ControlPanelProps {
    isSidebarOpen: boolean;

    isKeyLocked: boolean;
    setIsKeyLocked: (locked: boolean) => void; // A function that takes in a boolean and returns nothing.

    currentKeyName: string;

    dotDisplay: string;
    setDotDisplay: (display: string) => void;

    fingeringType: FingeringKey;
    setFingeringType: (type: FingeringKey) => void;

    position: number;
    handlePositionChange: (newPosition: number) => void;

    showPositionBox: boolean;
    setShowPositionBox: (isVisible: boolean) => void;
}

export default function ControlPanel({
    isSidebarOpen,

    isKeyLocked,
    setIsKeyLocked,

    currentKeyName,

    dotDisplay,
    setDotDisplay,

    fingeringType,
    setFingeringType,

    position,
    handlePositionChange,

    showPositionBox,
    setShowPositionBox
}: ControlPanelProps) {
    return (
        <div className={`side-panel ${!isSidebarOpen ? 'closed' : ''}`}>
            <h2>Controls</h2>
            {/* Key Lock Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'black' }}>
                <input
                    type="checkbox"
                    checked={isKeyLocked}
                    onChange={(e) => setIsKeyLocked(e.target.checked)}
                />
                Lock Key
            </label>

            {/* Fingering Type */}
            <select
                value={fingeringType}
                onChange={(e) => setFingeringType(e.target.value as FingeringKey)}
            >
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

            {/* Position Box Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'white', fontSize: '0.9rem' }}>
                <input
                    type="checkbox"
                    checked={showPositionBox}
                    onChange={(e) => setShowPositionBox(e.target.checked)}
                />
                Show Position Box
            </label>


            {/* Position Slider */}
            <input
                type="range"
                min="1"
                max="24"
                value={position}
                onChange={(e) => handlePositionChange(Number(e.target.value))}
            />
            {/*<span style={{ color: 'Black' }}>Pos: {position}</span>*/}

            <select
                value={position}
                onChange={(e) => handlePositionChange(Number(e.target.value))}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(p => (
                    <option key={p} value={p}>
                        Position {p === 1 ? 'I' : p === 2 ? 'II' : p === 3 ? 'III' : p === 4 ? 'IV' : p === 5 ? 'V' :
                            p === 6 ? 'VI' : p === 7 ? 'VII' : p === 8 ? 'VIII' : p === 9 ? 'IX' : p === 10 ? 'X' :
                                p === 11 ? 'XI' : p === 12 ? 'XII' : p === 13 ? 'XIII' : p === 14 ? 'XIV' : p === 15 ? 'XV' :
                                    p === 16 ? 'XVI' : p === 17 ? 'XVII' : p === 18 ? 'XVIII' : p === 19 ? 'XIX' : p === 20 ? 'XX' :
                                        p === 21 ? 'XXI' : p === 22 ? 'XXII' : p === 23 ? 'XXIII' : 'XXIV'}
                    </option>
                ))}
            </select>

            {/* Misc settings to be implemented later */}
            <h4>Fretboard Display Options</h4>
            <div>
                <label style={{ color: 'white', fontSize: '0.9rem' }}>Dot Display</label>
                <select value={dotDisplay} onChange={(e) => setDotDisplay(e.target.value)}>
                    <option value="dotDisplayFingers">Fingers</option>
                    <option value="dotDisplayNote">Note Names</option>
                    {/* <option value="dotDisplayRomam">Roman Numerals</option> */}
                    <option value="dotDisplayNone">Empty Dots</option>
                </select>
            </div>
        </div>
    );
}


