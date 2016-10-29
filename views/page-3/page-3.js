const ipc = require('electron').ipcRenderer;

// load and compile template
const source = document.getElementById('page-3-template').innerHTML;
const template = Handlebars.compile(source);

function start(event) {
  console.log("starting ...");

  // calling the main process to get data to display
  ipc.send('get-data');

  // when the data is available,
  ipc.once('get-data-reply',function(event, data){
    console.log("recevied a reply from main");
    console.log(data);

    var html    = template(data);
    document.getElementById('p3-result').innerHTML = html;
  });
}

document.getElementById('page-3').addEventListener("click",function(event){
  console.log("click on page3");
  if (event.target.dataset.action) {
    const action = event.target.dataset.action;
    switch (action) {
      case 'start':
        start(event);
        break;
      default:
        console.log("unknown acion : "+action);
    }
  }
});
