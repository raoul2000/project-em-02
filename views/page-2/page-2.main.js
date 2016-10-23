/**
 * Loaded in the MAIN process by main.js
 */

const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;


ipc.on('msg-page-2', function (event,arg) {
  console.log('msg-page-2');
  event.sender.send('asynchronous-reply', 'pong');
});
