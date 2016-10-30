const ipc = require('electron').ipcRenderer;

var vuejsApp = new Vue({
  el: '#vuejs-app',
  data: {
    "text" : {
      "title" : "title",
      "body" : "body here !!"
    },
    "root" : [
      { 'node' : "blue things", 'children' : []},
      { 'node' : "green stuff", 'children' : [
        { 'node' : "salad", 'children' : []},
        { 'node' : "alien", 'children' : []}
      ]}
    ]
  }
});


function startVuejs(event) {
  console.log("startVuejs ...");

  // calling the main process to get data to display
  ipc.send('vuejs-get-data');

  // when the data is available,
  ipc.once('vuejs-get-data-reply',function(event, data){
    console.log("recevied a reply from main");
    console.log(data);
    vuejsApp.text = data.text;
    vuejsApp.root = data.root;
  });
}

document.getElementById('vuejs').addEventListener("click",function(event){
  console.log("click on vuejs");
  if (event.target.dataset.action) {
    const action = event.target.dataset.action;
    switch (action) {
      case 'start':
        startVuejs(event);
        break;
      default:
        console.log("unknown acion : "+action);
    }
  }
});
