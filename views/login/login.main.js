const electron = require('electron');
const ipc = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;
const app = electron.app;
const restAPI = require('../../src/mras/mras.js');

/**
 * User login.
 * Performs login and returns the authToken on success.
 */
ipc.on('req-login', function (event,arg) {

  /**
   * arg : {
   *  "username" : username,
   *  "password" : pwd
   * }
   */

  restAPI.auth.login(arg.username, arg.password)
  .then(function(authToken){
    event.sender.send('resp-login-success', {
      "message" : "login  success",
      "token" : authToken
    });
  })
  .fail(function(err){
    event.sender.send('resp-login-error', {
      "message" : "failed to login",
      "error"   : err
    });
  });

});
