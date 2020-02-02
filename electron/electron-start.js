const { BrowserWindow, ipcMain, Menu, app } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

let win
const createWindow = () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: "Electron React Boiler-plate"
    })
    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..', 'build', 'index.html')}`)
    // win.loadURL(`file://${path.join(__dirname, '..', 'build', 'index.html')}`)
}

app.on('ready', createWindow)

ipcMain.on('event',function(e){
    console.log('Event Triggered')
    e.returnValue('Accepted')
})