const electron = require('electron');
const ipc = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;
const app = electron.app;


ipc.on('req-login', function (event,arg) {

  event.sender.send('resp-login-error', {
    "message" : "failed to login"
  });
  //ipcRenderer.send("req-save-credential", arg);
  /*
  event.sender.send('resp-login-success', {
    "message" : "login  success"
  });
  */

});
