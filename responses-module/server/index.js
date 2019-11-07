var express = require("express");
var bodyParser = require("body-parser");
// var items = require("../database-mongo");
const port = 3004;

var app = express();

app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/items", function(req, res) {
  // items.selectAll(function(err, data) {
  //   if (err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
  console.log(req.body);
  res.end("heeeeeeeeeey");
});

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
