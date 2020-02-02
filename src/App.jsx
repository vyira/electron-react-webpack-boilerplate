import React from 'react'
import './App.scss'
import { ipcRenderer } from 'electron'

const handleClick = (e) => {
    console.log(ipcRenderer.send('event', { e: e }))
}

function App() {
    return (
        <div className='App'>
            <h1>Your App Will Load Here</h1>
        </div>
    )
}

export default App
