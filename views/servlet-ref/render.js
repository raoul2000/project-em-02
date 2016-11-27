const storage = require('electron-json-storage');
const Datastore = require('nedb')
  , db = new Datastore({ filename: __dirname + '/../../data/servlet-ref', autoload: true });
const ipc = require('electron').ipcRenderer;

const servletRefContainer = document.getElementById('servlet-ref');

// prepare the vue
var servletRefView = new Vue({
  el: '#servlet-ref-view',
  data: {
    "servletRefList" : null,
    "editedServlet"  : null
  },
  method : {
    editServlet : function(servlet) {
      console.log("edit servlet");
    }
  },
  watch: {
    servletRefList: {
      handler: function (servletList) {
        console.log("saving list");
      },
      deep: true
    }
  }
});



servletRefContainer.addEventListener('before-show',function(event){
  console.log("before-show");
  db.find({}, function (err, docs) {
    if(err) {
      console.error(err);
    } else {
      console.log(docs);
      if(docs.length == 0) {
        db.insert({
          "id" : "servletID",
          "name" : "servlet name"
        },function(err,docs){
          if(err) throw err;
          console.log(docs);
        })
      }
      servletRefView.servletRefList = docs;
    }
  });
});

servletRefContainer.addEventListener('click',function(event){
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
