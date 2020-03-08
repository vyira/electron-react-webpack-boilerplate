import React from 'react'
import './App.scss'
import { ipcRenderer } from 'electron'

const handleClick = (e) => {
    console.log(ipcRenderer.send('event', { e: e }))
}

function App() {
    return (
        <div className="main"><h1>Electron React Webpack - Boilerplate</h1></div>
    )
}

export default App
