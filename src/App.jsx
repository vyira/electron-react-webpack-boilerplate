import React from 'react'
import './App.scss'
import { ipcRenderer } from 'electron'

const handleClick = (e) => {
    console.log(ipcRenderer.send('event', 'console-log'))
}

function App() {
    return (
        <button onClick={handleClick}>Pop-Up</button>
    )
}

export default App
