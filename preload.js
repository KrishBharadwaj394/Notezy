  const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	fileOpened: (cb) => ipcRenderer.on("file-opened", cb),
	saveFile: (content) => ipcRenderer.invoke("save-file", content),
});