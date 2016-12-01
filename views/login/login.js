/**
 * Loaded in the render process by the view HTML
 * example :
 * <script type="text/javascript">
 *      require('./views/page-1/page-1')
 * </script>
 */


const ipc = require('electron').ipcRenderer;

const btnLoginEl = document.getElementById('btn-login');
console.log("ok");
btnLoginEl.addEventListener('click',function(event){

  var username     = document.getElementById('username').value;
  var password     = document.getElementById('password').value;

  if( username.length === 0) {
    myApp.showNotification({
      title: 'Login Error',
      text: 'Please enter a username.',
      type: "error"
    });
    document.getElementById('username').focus(true);
  } else {
    // perform login : first innstall event handlers for login response
    ipc.on('resp-login-success',function(event,data){
      ipc.send("load-layout",{ "layout" : "editor"});
    });

    ipc.on('resp-login-error',function(event,data){
      btnLoginEl.disabled = false;
      document.getElementById('username').focus(true);
      myApp.showNotification({
        title: 'Login error',
        text: 'login failed',
        type: "error"
      });
    });
    // start login
    btnLoginEl.disabled = true;
    ipc.send('req-login', {
      "username" : username,
      "password" : password
    });
  }
});