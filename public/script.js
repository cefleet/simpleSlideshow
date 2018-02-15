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
var intervalID;
var slideTime;
AJAX("/images",function(d){
  runSlideShow(d);
});

function runSlideShow(data){
  //var slideView = document.getElementsByTagName("HTML")[0];
  var onSlide = -1;
//  slideView.style.background = "url(images/"+data[onSlide]+") no-repeat center center fixed #000";


  function changeSlide(){
    onSlide += 1;
    if(onSlide > data.length-1){
      onSlide = 0;
    }
    var image = document.getElementById("image");
    image.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/"+data[onSlide];
    image.appendChild(img);
    //slideView.style.background = "url(images/"+data[onSlide]+") no-repeat center center fixed #000";
    //this checks to see if there are any new images
    AJAX("/images",function(d){
      data = d;
    });
    AJAX("/getdisplaylength", function(d){
      if(d[0] != slideTime){
        slideTime = Number(d[0]);
        window.clearInterval(intervalID);
        intervalID = window.setInterval(changeSlide, slideTime*1000);
      }

    });
  };

  changeSlide();
  //intervalID = window.setInterval(changeSlide, slideTime*1000);

}
