const ipc = require('electron').ipcRenderer;

const page1Container = document.getElementById('page-1');

page1Container.addEventListener('click',function(event){
  ipc.send('msg-page-1');
});
