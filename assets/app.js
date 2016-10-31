
function documentReay(){
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

document.addEventListener('DOMContentLoaded', documentReay, false);
