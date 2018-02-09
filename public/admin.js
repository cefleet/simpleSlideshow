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

function getAllImages(){
  getImages("archived");
  getImages();
};

function getImages(type){
  if(type != 'archived'){
    type="images"
  }
  AJAX("/"+type,function(d){
    if(type == "archived"){
      updateImages(d,"archived");
    } else {
      updateImages(d,"active");
    }
  });
};



function updateImages(images,type){
  var folder = "images";
  if(type == "archived"){
    folder = "archives";
  }
  var container = document.getElementById(type+'List');
  container.innerHTML = "";

  for(var i = 0; i < images.length; i++){
    var img = new Image();
    img.src = folder+"/"+images[i];
    var imgContainer = document.createElement("div");
    imgContainer.classList.add("image");
    var action = document.createElement("span");
    action.classList.add("button");
    action.id= images[i];
    var text = document.createElement("span");
    text.classList.add("imageTitle");
    text.appendChild(document.createTextNode(images[i]));
    imgContainer.appendChild(text);
    imgContainer.appendChild(img);
    imgContainer.appendChild(action);
    container.appendChild(imgContainer);
    if(type == "active"){
      action.classList.add("moveToArchives");
      action.appendChild(document.createTextNode("Archive"));
      action.addEventListener("click", function(){
        AJAX("/movetoarchives/"+this.id, getAllImages)
      });
    } else {
      action.classList.add("moveToActive");
      action.appendChild(document.createTextNode("Activate"))
      action.addEventListener("click", function(){
        AJAX("/movetoimages/"+this.id, getAllImages)
      });
    }
  }
}

function iframeLoaded(){
  document.getElementById("formFrame").classList.add("hidden");
  var content = document.getElementById("formFrame").contentDocument.body.innerHTML;
  if(content == '["File Uploaded"]'){
    document.getElementById("formFrame").src = 'form.html'
  }
   getAllImages();
}

document.addEventListener("DOMContentLoaded",function(){

  document.getElementById("formFrame").addEventListener("load", iframeLoaded);

  document.getElementById("formFrame").classList.add("hidden");

  document.getElementById("uploadImageButton").addEventListener("click",function(){
    document.getElementById("formFrame").classList.remove("hidden");
  });

  document.getElementById("saveDelay").addEventListener("click", function(){
    var delay = document.getElementById('delay').value;
    AJAX("/setdisplaylength/"+delay, function(d){
      console.log('It worked');
    });
  });

  AJAX("/getdisplaylength", function(d){
    document.getElementById("delay").value = d[0];
  });

  getAllImages();
});
