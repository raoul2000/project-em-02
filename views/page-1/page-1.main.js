/**
 * Loaded in the MAIN process by main.js
 */

const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;


ipc.on('msg-page-1', function (event,arg) {
  console.log('msg-page-1');
  event.sender.send('asynchronous-reply', 'pong');
});
