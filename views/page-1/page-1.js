/**
 * Loaded in the render process by the view HTML
 * example :
 * <script type="text/javascript">
 *      require('./views/page-1/page-1')
 * </script>
 */


const ipc = require('electron').ipcRenderer;
PNotify.prototype.options.styling = "bootstrap3";

const page1Container = document.getElementById('page-1');

page1Container.addEventListener('click',function(event){
  const action = event.target.dataset.action;
  console.log("pnotify");
  if( action === 'pnotify') {
    new PNotify({
        title: 'Regular Notice',
        text: 'Check me out! I\'m a notice.',
        type: "success",
        "buttons" : {
          "closer" : true
        }
    });
  }
  if( action === "show-overlay") {
    myApp.showOverlay("loading for 2 seconds ...");
    setTimeout(window.myApp.hideOverlay, 2000);
  } else {
    ipc.send('msg-page-1');
  }
});

ipc.on('asynchronous-reply',function(event, arg){
  console.log("recevied a reply from main");
  console.log(arg);
});
