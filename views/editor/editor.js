const ipc = require('electron').ipcRenderer;

const btnSaveStory = document.getElementById('btn-save-story');
btnSaveStory.addEventListener('click',function(event){

  console.log("btn-save-story click");
  var story = {
    "title" : document.getElementById('title').value,
    "body"  : document.getElementById('body').value
  };

  if( story.title.length === 0) {
    document.getElementById('title').focus(true);
    myApp.showNotification({
      title: 'Error',
      text: 'A title is required',
      type: "error"
    });
  } else {
    // perform login : first innstall event handlers for login response
    ipc.once('resp-save-story-success',function(event,data){
      btnSaveStory.disabled = false;
      myApp.showNotification({
        title: 'Done',
        text: 'The story has been saved',
        type: "success",
        delay: 1000,
      });
    });

    ipc.once('resp-save-story-error',function(event,data){
      btnSaveStory.disabled = false;
      myApp.showNotification({
        title: 'Error',
        text: 'Failed to save story',
        type: "error"
      });
    });
    // start login
    btnSaveStory.disabled = true;
    ipc.send('req-save-story', story);
  }
});
