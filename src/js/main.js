/**
 * app is the main Electron app object.
 * @type {Object}
 */
const { app } = require('electron')

/**
 * BrowserWindow a class for creating windows in Electron.
 * @type {Function}
 */
const { BrowserWindow } = require('electron')

console.log(app)
console.log(BrowserWindow)
// Create Home Folder

/**
 * Filesystem object. Used to make fake home directory for node-PTY to use.
 * Methods at https://www.npmjs.com/package/fs-extra
 */
let fs = require('fs-extra');
/**
 * String storing path of fake home directory.
 */
const dir = './Home'
try {
  fs.mkdirSync(dir)
}
catch (err){
  console.error(err)
  if (err.code == "EEXIST"){
    console.log("\n\n --- Removing File...")
    fs.remove(dir).then(() => {
      console.log("\n\n --- Trying again...")
      fs.mkdirSync(dir)
    }).catch(err => {
      console.error(err)
    })
  }
}

/**
 * Electron createWindow function called when app.whenReady() resolves.
 * This method will be called when Electron has finished initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 * @return {None} Function returns nothing.
 */
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('src/html/index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
