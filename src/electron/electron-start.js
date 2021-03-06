const { BrowserWindow, ipcMain, Menu, app } = require('electron')
const path = require('path')
const isDev = true

let win
const createWindow = () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: "Electron React Boiler-plate"
    })
    win.loadURL('http://localhost:3000/index.html')
    // win.loadURL(`file://${path.join(__dirname, '..', 'build', 'index.html')}`)
    win.webContents.openDevTools({ mode: "detach" })
}

app.on('ready', createWindow)

ipcMain.on('event', function (e) {
    console.log('Event Triggered')
})