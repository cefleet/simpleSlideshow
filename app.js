const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mv = require('mv');
const app = express();
process.chdir(__dirname);
app.use(fileUpload());

var slideTime = 1000
/*
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
*/

app.use(express.static('public'))

app.get("/images",function(req,res){
  fs.readdir("public/images/", function(err, items) {
     res.send(JSON.stringify(items))
  });
});

app.get("/images",function(req,res){
  fs.readdir("public/archives/", function(err, items) {
     res.send(JSON.stringify(items))
  });
});

app.get("/movetoarchives/:image", function(req,res){
  if(fs.existsSync("public/images/"+req.params.image)){
    mv("public/images/"+req.params.image, "public/archives/"+req.params.image,
      {mkdirp:true},
      function(err){
        if(!err){
          res.send("File Moved.");
        } else {
          res.send(JSON.stringify(err))
        }
      }
    );
  } else {
    res.send("File Not Found.")
  }
});

app.get("/movetoimages/:image", function(req,res){
  if(fs.existsSync("public/archives/"+req.params.image)){
    mv("public/archives/"+req.params.image, "public/images/"+req.params.image,
      {mkdirp:true},
      function(err){
        if(!err){
          res.send("File Moved.");
        } else {
          res.send(JSON.stringify(err))
        }
      }
    );
  } else {
    res.send("File Not Found.")
  }
});

app.get("/setdisplaylength/:time", function(req,res){
  if(isNaN(req.params.time)){
    res.send("That is not a Number.")
  } else {
    slideTime = req.params.time;
    res.send("Time Set.")
  }
});

app.post("/upload",function(req,res){
  console.log(req);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let image = req.files.image;

  // Use the mv() method to place the file somewhere on your server
  image.mv('public/images/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File Uploaded');
  });
});


app.listen(6789, function () {

  console.log('6789')
});
