/**
 * Loaded in the render process by the view HTML
 * example :
 * <script type="text/javascript">
 *      require('./views/page-1/page-1')
 * </script>
 */


const ipc = require('electron').ipcRenderer;

const page1Container = document.getElementById('page-1');

page1Container.addEventListener('click',function(event){
  ipc.send('msg-page-1');
});

ipc.on('asynchronous-reply',function(event, arg){
  console.log("recevied a reply from main");
  console.log(arg);
});
