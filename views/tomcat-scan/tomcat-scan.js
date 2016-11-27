const ipc = require('electron').ipcRenderer;

const elConnForm = document.getElementById("tc-conn-form");

// The Tomcat scan Result view
const tcVue = new Vue({
  el: '#tc-scan-result',
  data: {
    "scanResult" : null,
    "servletList" : null
  }
});

function servletList(scanResult, ip) {
  var result = [];
  scanResult.contexts.forEach(function(ctxFile){
    ctxFile.list.forEach(function(ctx) {
      if( Array.isArray(ctx.servlets)) {
        ctx.servlets.forEach(function(servlet){
          result.push(servlet);
        });
      }
    });
  });
  return result;
}

function hideConnectionForm() {
  elConnForm.classList.add('hidden');
}

function showConnectionForm(){
  elConnForm.classList.remove('hidden');
}
/**
 * Initiate tomcat scan
 *
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function startScan(event) {

  var host = document.getElementById('input-host').value;
  var username = document.getElementById('input-username').value;
  var password = document.getElementById('input-password').value;
  // TODO : validate inputs
  //

  hideConnectionForm();
  myApp.showOverlay("Exploring tomcat installation ...");
  console.log('host = '+host);

  // calling the main process to get data to display
  ipc.send('start-scan', {
    "host" : host,
    "username" : username,
    "password" : password
  });

  // when the data is available,
  ipc.once('start-scan-reply',function(event, data){
    myApp.hideOverlay();
    //showConnectionForm();

    console.log("recevied a reply from main");
    console.log(data);
    
    tcVue.scanResult = data;
    tcVue.servletList = servletList(data,host);
  });
}

document.getElementById('tomcat-scan').addEventListener("click",function(event){

  if (event.target.dataset.action) {
    const action = event.target.dataset.action;
    switch (action) {
      case 'start-scan':
        startScan(event);
        break;
      default:
        console.log("unknown acion : "+action);
    }
  }
});
