var fs = require('fs');
var express = require('express');
//var bodyParser = require('body-parser');
var app = express()

/*app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
*/
app.use(express.static('public'))

app.get("/images/",function(req,res){
/*
  if(req.params.action != null){
    res.send(JSON.stringify(req.returnData))
  } else {
    res.send("No Data")
  }
  */
  fs.readdir("public/images/", function(err, items) {
    //console.log(items);
    //TODO if it is not a jpg or png ignore it
    res.send(JSON.stringify(items))
  });

});


app.listen(6789, function () {

  console.log('6789')
});
