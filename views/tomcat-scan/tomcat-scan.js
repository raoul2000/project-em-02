const ipc = require('electron').ipcRenderer;

// load and compile template
const source = document.getElementById('page-3-template').innerHTML;
const template = Handlebars.compile(source);

function startScan(event) {
  console.log("starting ...");

  var host = document.getElementById('input-host').value;
  var username = document.getElementById('input-username').value;
  var password = document.getElementById('input-password').value;

  console.log('host = '+host);

  // calling the main process to get data to display
  ipc.send('start-scan', {
    "host" : host,
    "username" : username,
    "password" : password
  });

  // when the data is available,
  ipc.once('start-scan-reply',function(event, data){
    console.log("recevied a reply from main");
    console.log(data);
/*
    var html    = template(data);
    document.getElementById('p3-result').innerHTML = html;
    */
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
