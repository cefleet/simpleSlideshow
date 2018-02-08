var fs = require('fs');
var express = require('express');
var app = express()
process.chdir(__dirname);
app.use(express.static('public'))

app.get("/images",function(req,res){
  fs.readdir("public/images/", function(err, items) {
     res.send(JSON.stringify(items))
  });

});


app.listen(6789, function () {

  console.log('6789')
});
