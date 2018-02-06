var AJAX = function(url,returnFunction){
    var x=new XMLHttpRequest()
    x.onload=function(){
      if (x.status === 200) {
        returnFunction(JSON.parse(x.responseText))
      }
    };
    x.open('GET',url,true);
    x.setRequestHeader('Content-Type', 'application/json');
    x.send()
}

AJAX("/images",function(d){
  runSlideShow(d);
});

function runSlideShow(data){
  var slideView = document.getElementsByTagName("HTML")[0];
  var onSlide = 0;
  slideView.style.background = "url(images/"+data[onSlide]+") no-repeat center center fixed #000";


  function changeSlide(){
    onSlide += 1;
    if(onSlide > data.length-1){
      onSlide = 0;
    }
    slideView.style.background = "url(images/"+data[onSlide]+") no-repeat center center fixed #000";
    //this checks to see if there are any new images
    AJAX("/images",function(d){
      data = d;
    });
  };

  var intervalID = window.setInterval(changeSlide, 10000);

}
