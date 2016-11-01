const storage = require('electron-json-storage');
const ipc = require('electron').ipcRenderer;

const settingsContainer = document.getElementById('settings');

// prepare the vue
var vuejsApp = new Vue({
  el: '#settings-form',
  data: {
    "param1" : "value 1",
    "param2" : "value 2"
  }
});


settingsContainer.addEventListener('before-show',function(event){
  console.log("before-show");
  storage.has('settings',function(err,settings){
    if(err) {
      // setting default values
      vuejsApp.param1 = "default 1";
      vuejsApp.param2 = "default 2";
    } else {
      storage.get('settings',function(err,val){
        if(err) return console.error(err);
        vuejsApp.param1 = val.param1;
        vuejsApp.param2 = val.param2;
      });
    }
  });
});

settingsContainer.addEventListener('click',function(event){
  const action = event.target.dataset.action;
  if( action === 'save-settings') {
    console.log(vuejsApp.data);
    storage.set('settings', {
      "param1" : vuejsApp.param1,
      "param2" : vuejsApp.param2
    },function(err){
      if(err)  {
        myApp.showNotification({
          title: 'Oups ! ',
          text: 'Your settings could not be saved',
          type: "error"
        });
        throw err;
      } else {
        myApp.showNotification({
          title: 'Done',
          text: 'Your settings have been saved',
          type: "success"
        });
      }
    })
  }
});
