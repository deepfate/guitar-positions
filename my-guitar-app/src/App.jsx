import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Fretboard from './Fretboard'

function App() {



  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Fretboard App</h1>

      {/* 2. Added: Render the Fretboard component right here! */}
      <Fretboard />
      

    </>
  )
}

export default App
