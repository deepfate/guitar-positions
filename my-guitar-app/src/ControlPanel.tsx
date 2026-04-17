import { FingeringType } from './util/berkleeDictionary';
import { DotDisplayOption, LockMode } from './Fretboard';


/** Props for the Control Panel */
interface ControlPanelProps {
    /** Panel Open/Close state */
    isSidebarOpen: boolean;

    /** */
    //isKeyLocked: boolean;
    /** */
    //setIsKeyLocked: (locked: boolean) => void; // A function that takes in a boolean and returns nothing.

    /** */
    currentKeyName: string;

    /** Allow user to choose what is shown inside fret dots. */
    dotDisplay: DotDisplayOption;
    /** */
    setDotDisplay: (display: DotDisplayOption) => void;

    /** Toggles display of all fret dots. */
    dotShowAll: boolean;
    /** */
    setDotShowAll: (display: boolean) => void;

    showStretches: boolean;
    setShowStretches: (display: boolean) => void;

    lockMode: LockMode;
    setLockMode: (mode: LockMode) => void;

    /** Toggles fret inlay dots */
    // fretInlayState: boolean;
    // setFretInlayState: (display: boolean) => void;

    /** */
    fingeringType: FingeringType;
    /** */
    //setFingeringType: (type: FingeringType) => void;
    handleTypeChange: (type: FingeringType) => void;

    newKey: string;
    handleKeyChange: (key: string) => void;

    /** */
    position: number;
    /** */
    handlePositionChange: (newPosition: number) => void;

    /** */
    showPositionBox: boolean;
    /** */
    setShowPositionBox: (isVisible: boolean) => void;
}

/**
 * 
 */
export default function ControlPanel({
    isSidebarOpen,

    //isKeyLocked,
    //setIsKeyLocked,

    currentKeyName,

    dotDisplay,
    setDotDisplay,

    dotShowAll,
    setDotShowAll,

    // fretInlayState,
    // setFretInlayState,

    lockMode,
    setLockMode,

    fingeringType,
    //setFingeringType,
    handleTypeChange,
    newKey,
    handleKeyChange,

    position,
    handlePositionChange,



    showPositionBox,
    setShowPositionBox
}: ControlPanelProps) {
    return (
        <div className={`side-panel ${!isSidebarOpen ? 'closed' : ''}`}>
            <h2>Controls</h2>

            {/* Fingering Type */}
            <label>Fingering Type:</label>
            <select
                value={fingeringType}
                // onChange={(e) => setFingeringType(e.target.value as FingeringType)}
                onChange={(e) => handleTypeChange(e.target.value as FingeringType)}
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

            {/* Temp dropdown to test key change */}
            <label>Temp for Key Change</label>
            <select
                value={ }
            >
                <option>C</option>
                <option>G</option>
                <option>D</option>
                <option>A</option>
                <option>E</option>
                <option>B</option>
                <option>F# / Gb</option>
                <option>Db / C#</option>
                <option>Ab / G#</option>
                <option>Eb / D#</option>
                <option>Bb / A#</option>
                <option>F</option>

            </select>

            {/* Choose Lock Mode (Lock Key, Lock Position, or move freely) */}
            <label>Lock Mode:</label>
            <select value={lockMode} onChange={(e) => setLockMode(e.target.value as LockMode)}>
                <option value="none">Free Movement</option>
                <option value="key">Lock Key - Change Position to another in the same key.</option>
                <option value="position">Lock Position - Change Key, keeping position at the same fret.</option>
            </select>

            {/* Position Slider */}
            <label>Position:</label>
            <input
                type="range"
                min="1"
                max="24"
                value={position}
                disabled={lockMode === 'position'}
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



            {/* Fret Dots Display Options */}
            <h4>Fret Dots Display Options</h4>

            {/* Toggle Show All Fret Dots */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'black' }}>
                <input
                    type="checkbox"
                    checked={dotShowAll}
                    onChange={(e) => setDotShowAll(e.target.checked)}
                />
                Toggle Fret Dots
            </label>

            {/* Options for what is rendered inside fret dots */}
            <div>
                <label style={{ color: 'white', fontSize: '0.9rem' }}>Dot Display</label>
                <select value={dotDisplay} onChange={(e) => setDotDisplay(e.target.value as DotDisplayOption)}>
                    <option value="fingers">Fingers</option>
                    <option value="notes">Note Names</option>
                    {/* <option value="numerals">Roman Numerals</option> */}
                    {/* <option value="imrp">imrp</option> */}
                    <option value="none">Empty Dots</option>
                </select>
            </div>


            {/* Fretboard Display Options */}
            <h4>Fretboard Display Options</h4>

            {/*

            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'black' }}>
                <input
                    type="checkbox"
                    checked={fretInlayState}
                    onChange={(e) => setFretInlayState(e.target.checked)}
                />
                Toggle Fret Inlay
            </label>

            */}

        </div>
    );
}


