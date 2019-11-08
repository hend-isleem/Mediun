var mongoose = require("../navbar-module/node_modules/mongoose/index.js");
var config = require("../config.js");
var uri = config.mongoURI;

mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true, dbName: "test" })
  .catch(error => console.log("this is error!", error));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

var itemSchema = mongoose.Schema({
  quantity: Number,
  description: String
});

var Item = mongoose.model("Item", itemSchema);
var newItem = new Item({
  quantity: 10,
  description: "Test Test"
});
newItem.save();

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

selectAll((err, result) => {
  console.log(result);
});
module.exports.selectAll = selectAll;
