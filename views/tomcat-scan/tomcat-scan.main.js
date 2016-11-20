/**
 * Loaded in the MAIN process by main.js
 */

const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;

const tc = require('tomcat-scan').tomcatScan;

var entity = {
	'HOME' : "/mnt/d/dev/tomcat-scan/test/sample-data/home"
};

ipc.on('start-scan', function (event,arg) {
  console.log("start-scan request : started ...");

  tc.scanTomcat(arg,"/mnt/d/dev/tomcat-scan/test/sample-data/home/tomcat-1", entity)
  .then(function(result){
    result.configDOM = null;	// avoid circular reference when stringify JSON
    result.config.DOM = null;

    event.sender.send('start-scan-reply', result );
  })
  .fail(function(err){
    event.sender.send('start-scan-reply', err );
  });

});
