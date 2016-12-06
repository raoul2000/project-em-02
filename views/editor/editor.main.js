const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;
const restAPI = require('../../src/mras/mras.js');


ipc.on('req-save-story', function (event,arg) {
  /**
   * arg : {
   *  "credential" : {
   *    "username" : username,
   *    "password" ; pwd
   *  },
   *  "story" : {
   *    "title" : "this is the title",
   *    "body" : "this is the body"
   *  }
   * }
   */
   var authToken;
   restAPI.auth.login( arg.username, arg.password)
   .then(function(result){
     authToken = result;

   })
   .then(function(result){
     return restAPI.auth.logout(authToken)
     .done(function(){
       event.sender.send('resp-save-story-success', {
         "message" : "success"
       });
     });

   })
   .fail(function(err){
     event.sender.send('resp-save-story-error', {
       "message" : "failed to save-story",
       "error" : err
     });
   });
});
