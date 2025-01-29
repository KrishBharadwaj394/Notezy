let {app, BrowserWindow, ipcMain} =  require("electron");
let createMenu = require("./helpers/createMenu");
let path = require("node:path");
let saveFile = require("./helpers/saveFile");

let mainWindow;
let createWindow = () =>{
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    }
  });
  createMenu(mainWindow);
  mainWindow.loadFile("index.html");
};

app.whenReady().then(()=>{
  ipcMain.handle("save-file",saveFile);
  createWindow();
});

app.on("window-all-closed",()=>{
  if(process.platform !== "darwin"){
    app.quit();
    mainWindow = null;
  }

  app.on("activate",()=>{
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})