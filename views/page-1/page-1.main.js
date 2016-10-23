const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;


ipc.on('msg-page-1', function (event) {
  console.log('msg-page-1');
});
