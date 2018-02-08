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

function iframeLoaded(){
  document.getElementById("formFrame").classList.add("hidden");
  var content = document.getElementById("formFrame").contentDocument.body.innerHTML;
  if(content == 'File Uploaded'){
    document.getElementById("formFrame").src = 'form.html'
  }

  console.log('I need to grab the images now.')
}

document.addEventListener("DOMContentLoaded",function(){
  document.getElementById("formFrame").addEventListener("load", iframeLoaded);
  document.getElementById("formFrame").classList.add("hidden");
  document.getElementById("uploadImageButton").addEventListener("click",function(){
    document.getElementById("formFrame").classList.remove("hidden");
  });
});
