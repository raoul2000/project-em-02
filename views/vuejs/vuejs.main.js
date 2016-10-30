/**
 * Loaded in the MAIN process by main.js
 */

const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;


ipc.on('get-data', function (event,arg) {
  const now = new Date();
  const data = {
    "title" : "this is my title",
    "body" : "time is "+now};
  event.sender.send('get-data-reply', data );
});
