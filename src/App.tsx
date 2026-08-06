import { useState } from 'react'
import { MusicKey, FingeringType, LockMode} from './types/music';

import './App.css'; // Clear out the defulat Vite CSS stuff in this.

// Component Imports
//import Fretboard from './Fretboard';
//import CircleOfFifths from './util/CircleOfFifths';
//import DraggableBox from './util/DraggableBox';
import Fretboard from './components/Fretboard';
import CircleOfFifths from './components/CircleOfFifths';
import DraggableBox from './components/DraggableBox';

function App() {
  // <MusicKey> forces this state to ONLY accept valid keys.
  // Accidentally typing setCurrentKey(5) will be blocked by TypeScript.
  const [currentKey, setCurrentKey] = useState<MusicKey>('C');
  
  const [fingeringType, setFingeringType] = useState<FingeringType>('type1');
  const [lockMode, setLockMode] = useState<LockMode>('none');

  // Standard primitives like 'number' or 'boolean' are already built into TypeScript
  const [position, setPosition] = useState<number>(0);

  return (
    <>
      <h1>Fretboard App</h1>
      <DraggableBox title="Fretboard View" defaultX={20} defaultY={20}>
        <Fretboard 
          currentKey={currentKey}
          fingeringType={fingeringType}
          lockMode={lockMode}
          position={position}
        />
      </DraggableBox>
      
      <DraggableBox title="Circle of Fifths View" defaultX={400} defaultY={20}>
        <CircleOfFifths
          currentKeyName={currentKey}
          onKeyChange={setCurrentKey}
        />
      </DraggableBox>
    </>
  );
}

export default App
