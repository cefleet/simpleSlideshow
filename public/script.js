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
var width = 800;
var height = 640;
AJAX("/images",function(d){
  runSlideShow(d);
});

function runSlideShow(data){
  //var slideView = document.getElementsByTagName("HTML")[0];
  var onSlide = -1;
//  slideView.style.background = "url(images/"+data[onSlide]+") no-repeat center center fixed #000";
  height = window.innerHeight;
  width = window.innerWidth;

  function updateSize(){
    var images = document.getElementsByClassName("scaledImage");
    for(var i=0; i < images.length; i++){
      images[i].style.width = width+'px';
      images[i].style.height = height+'px';
      var img = images[i].getElementsByTagName("img")[0];
      console.log(img);
      if(img.width < width && img.height < height){
        //whichever is closer is the one we set the scale based on
        if(width-img.width < height - img.height){
          var per = width / img.width;
        } else {
          var per = height / img.height;
        }
        img.width = img.width*per;
        img.height = img.height*per;
      }
    }

  }

  function changeSlide(){

    if(height != window.innerHeight || width != window.innerWidth){
      height = window.innerHeight;
      width = window.innerWidth;
      updateSize();
    }

    onSlide += 1;
    if(onSlide > data.length-1){
      onSlide = 0;
    }

    if(!document.getElementById(data[onSlide])){
      var image = document.getElementById("image");
      var imgDiv = document.createElement("div");
      imgDiv.classList.add("scaledImage");
      imgDiv.style.width = width+'px';
      imgDiv.style.height = height+'px';
      var img = document.createElement("img");
      img.src = "images/"+data[onSlide];
      img.id = data[onSlide];
      image.appendChild(imgDiv);
      imgDiv.appendChild(img);
      img.onload = function(){
        //need to scale up if both are smaller
        if(img.width < width && img.height < height){
          //whichever is closer is the one we set the scale based on
          if(width-img.width < height - img.height){
            var per = width / img.width;
          } else {
            var per = height / img.height;
          }
          img.width = img.width*per;
          img.height = img.height*per;
        }
      }
    }

    var images = document.getElementsByTagName("img");
    for(var i = 0; i < images.length; i++){
      images[i].classList.add("hidden");
    }
    console.log(data[onSlide]);
    document.getElementById(data[onSlide]).classList.remove("hidden");


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
