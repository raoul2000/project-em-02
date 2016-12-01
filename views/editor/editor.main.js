const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;
//const mras = require('../../src/mras/mras.js');


ipc.on('req-save-story', function (event,arg) {
  /*
  event.sender.send('resp-save-story-error', {
    "message" : "failed to save-story"
  });*/

  console.log(getCredentials());

  event.sender.send('resp-save-story-success', {
    "message" : "success"
  });

});
