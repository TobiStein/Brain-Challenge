const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')


const createWindow = () => {
  // Remove menu
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // preload.js runs before the renderer process is loaded.
    }
  });

  win.loadFile('index.html');
};


app.whenReady().then(() => {
  createWindow();

  // For macOS users
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) 
      createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') 
    app.quit();
});
