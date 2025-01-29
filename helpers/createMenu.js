let {app,Menu} = require("electron");
let openFile = require("./openFile");
let saveFile = require("./saveFile");
let createAboutWindow = require("./createAboutWindow");

function createMenu(mainWindow){
    let isMac = process.platform === "darwin";

    let menu = Menu.buildFromTemplate([
      ...(isMac ? [
        {
          label: app.name,
          submenu: [
            {role: "about"},
            {type: "separator"},
            {role: "services"},
            {type: "separator"},
            {role: "hide"},
            {role: "hideothers"},
            {role: "unhide"},
            {type: "separator"},
            {role: "quit"}
          ]
        }
      ]:[]),
      // File Tab
      {
        label: "File",
        submenu: [
          isMac ? {role: "close"} : {role: "quit"},
          {
            label : "Open File",
            accelerator: "CmdOrCtrl+O",
            click: () => openFile(mainWindow)
          },
          {
            label : "Save file",
            accelerator: "CmdOrCtrl+S",
            click: () => saveFile(mainWindow),
          }
        ]
      },
      // Edit Tab
      {
        label: "Edit",
        submenu: [
          { role: "undo" },
          { role: "redo" },
          { type: "separator" },
          { role: "cut" },
          { role: "copy" },
          { role: "paste" },
          ...(isMac
            ? [
                { role: "pasteAndMatchStyle" },
                { role: "delete" },
                { role: "selectAll" },
                { type: "separator" },
                {
                  label: "Speech",
                  submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
                },
              ]
            : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
        ],
      },
      // View Tab
      {
        label: "View",
        submenu: [
          { role: "reload" },
          { role: "forceReload" },
          { type: "separator" },
          { role: "resetZoom" },
          { role: "zoomIn" },
          { role: "zoomOut" },
          { type: "separator" },
          { role: "togglefullscreen" },
        ],
      },
      // Window Tab
      {
        label: "Window",
        submenu: [
          { role: "minimize" },
          { role: "zoom" },
          ...(isMac
            ? [{ type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" }]
            : [{ role: "close" }]),
        ],
      },
      // Help tab
      {
        role: "help",
        submenu: [
          {
            label: "About",
            click: createAboutWindow,
          },
          {
            label: "Build more",
            click: async () => {
              const { shell } = require("electron");
              await shell.openExternal("https://electronjs.org");
            },
          },
        ],
      }
    ]);

    Menu.setApplicationMenu(menu);
}

module.exports = createMenu;