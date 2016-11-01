function ShowNotificationOnStartup(){
  setTimeout(
    function(){
      new PNotify({
        title: 'Ready !',
        text: 'Your app is ready to run ! ... and it even includes notifications',
        type: "info",
        animate_speed :"fast",
        animate : "slide",
        delay: 3000,
        "buttons" : {
          "closer" : true
        }
      });
      new PNotify({
        title: 'Go go go !',
        text: 'Star now ',
        type: "success",
        animate_speed :"fast",
        animate : "slide",
        delay : 3000,
        "buttons" : {
          "closer" : true
        }
      });
    },
    2000
  )
}



window.myApp = {

  showOverlay : function(text) {
    const el = document.getElementById('loader-1');
    if( text ) {
      el.dataset.text = text;
    }
    el.classList.add('is-active');
  },
  hideOverlay : function() {
    const el = document.getElementById('loader-1');
    el.dataset.text = '';
    el.classList.remove('is-active');
  },
  onDocumentReady : function() {
    ShowNotificationOnStartup();
  },

  showNotification : function(options) {
    
  }
};


document.addEventListener('DOMContentLoaded', window.myApp.onDocumentReady, false);
