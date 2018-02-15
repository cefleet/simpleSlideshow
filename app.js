const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mv = require('mv');
const app = express();
process.chdir(__dirname);
app.use(fileUpload());

var slideTime = 10
/*
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
*/

app.use(express.static('public'))

app.get("/images",function(req,res){
  fs.readdir("public/images/", function(err, items) {
    if(!items){
      items = [];
    }
    res.send(JSON.stringify(items))
  });
});

app.get("/archived",function(req,res){
  fs.readdir("public/archives/", function(err, items) {
    if(!items){
      items = [];
    }
    res.send(JSON.stringify(items))
  });
});

app.get("/movetoarchives/:image", function(req,res){
  if(fs.existsSync("public/images/"+req.params.image)){
    mv("public/images/"+req.params.image, "public/archives/"+req.params.image,
      {mkdirp:true},
      function(err){
        if(!err){
          res.send(JSON.stringify(["File Moved."]));
        } else {
          res.send(JSON.stringify(err))
        }
      }
    );
  } else {
    res.send(JSON.stringify(["File Not Found."]))
  }
});

app.get("/movetoimages/:image", function(req,res){
  if(fs.existsSync("public/archives/"+req.params.image)){
    mv("public/archives/"+req.params.image, "public/images/"+req.params.image,
      {mkdirp:true},
      function(err){
        if(!err){
          res.send(JSON.stringify(["File Moved."]));
        } else {
          res.send(JSON.stringify(err))
        }
      }
    );
  } else {
    res.send(JSON.stringify(["File Not Found."]))
  }
});

app.get("/setdisplaylength/:time", function(req,res){
  if(isNaN(req.params.time)){
    res.send(JSON.stringify(["That is not a Number."]))
  } else {
    slideTime = req.params.time;
    res.send(JSON.stringify(["Time Set."]))
  }
});

app.get("/getdisplaylength", function(req,res){
  res.send(JSON.stringify([slideTime]))
});


app.post("/upload",function(req,res){
  if (!req.files)
    return res.status(400).send(JSON.stringify(['No files were uploaded.']));

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  var image = req.files.image;
  // Use the mv() method to place the file somewhere on your server
  image.mv('public/images/'+image.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send(JSON.stringify(['File Uploaded']));
  });
});


app.listen(6789, function () {

  console.log('6789')
});
