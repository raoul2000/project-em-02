/**
 * Loaded in the MAIN process by main.js
 */

const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;

const tomcatScan = require('tomcat-scan');

var entity = {
	'HOME' : "/mnt/d/dev/tomcat-scan/test/sample-data/home"
};

ipc.on('start-scan', function (event,arg) {
  console.log("start-scan request : started ...");

	// - call tomcat-scan
	// - process the scan result to prepare it for usage  in the app
	// 		- idenntify knowwn servlets based on the servlet reference list
	// 		- for each known servlet, complete its description by mergin scan runtime info (returned by the scan)
	// 		  and reference info (like doc url)
	//
	event.sender.send('start-scan-reply',{
		"port" : 8080,
		"servlet" : [
			{
				"id" : "srv1", 		"name" : "MySrv1", 				"docBase" : "/folder11/folder/folder",				"path" : "/servlet11" ,
				"url" : {
					"admin" : "http://",
					"doc" : "http://confluence"
				}
			},
			{	"id" : "srv2",		"name" : "MySrv2",				"docBase" : "/folder22/folder/folder",				"path" : "/servlet22"}
		]
	});
	/*
  tomcatScan.run(arg,"/mnt/d/dev/tomcat-scan/test/sample-data/home/tomcat-1", entity)
  .then(function(result){
    result.configDOM = null;	// avoid circular reference when stringify JSON
    result.config.DOM = null;

    event.sender.send('start-scan-reply', result );
  })
  .fail(function(err){
    event.sender.send('start-scan-reply', err );
  });
	*/

});
