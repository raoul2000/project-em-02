/**
 * Loaded in the MAIN process by main.js
 */

const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;

ipc.on('vuejs-get-data', function (event,arg) {
  const now = new Date();
  event.sender.send('vuejs-get-data-reply', {
    "text" : {
      "title" : "Vues.js is cool",
      "body" : "yes it is !! time is "+now
    },
    "root" : [
      { 'node' : "blue things", 'children' : [
        { 'node' : "The sky", 'children' : []},
        { 'node' : "your eyes", 'children' : []},
        { 'node' : "the time ("+now+")", 'children' : []}
      ]},
      { 'node' : "green stuff", 'children' : [
        { 'node' : "salad", 'children' : []},
        { 'node' : "alien", 'children' : []}
      ]}
    ]
  });
});
