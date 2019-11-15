const mongoose = require('../node_modules/mongoose/index.js');
// const dummy = require("./dummydata");
const config = require("../../config.js");
const uri = process.env.mongoURI || config.mongoURI;
// const uri = "mongodb+srv://hend:sleepyash@cluster0-ozydj.mongodb.net/Test?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: 'mediunDB'
  })
  .catch((error) => console.log('this is error!', error));

const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

const userSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String },
  pic: { type: String },
  email: { type: String },
  bio: { type: String }
});

const articleSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  authorId: { type: Number },
  title: { type: String },
  subTitle: { type: String },
  pic: { type: String },
  createdAt: { type: Date, default: Date.now },
  readingTime: { type: Number },
  text: { type: String },
  clapsNumber: { type: Number },
  comments: { type: Array },
  tags: { type: Array }
});

const User = mongoose.model('User', userSchema);
const Article = mongoose.model('Article', articleSchema);


const selectAll = function(model,callback,id) {
  if(typeof id === 'undefined'){
    model.find({}, function(err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }else{
    model.find({id:id}, function(err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }

};


// const selectAll = function(id, callback) {
//   var allData = {};
//   User.find({}, function(err, users) {
//     if (err) {
//       callback(err, null);
//     } else {
//       console.log(users+"users");
//       allData["users"] = users;
//       Article.find({id : id}, function(err, arts) {
//         if (err) {
//           callback(err, null);
//         } else {
//           console.log(arts+"arts");
//           allData["arts"] = arts;
//           callback(null, allData);
//         }
//       });
//     }
//   });
// };

// const saveUsers = function(arrayOfObjs) {
//   for (var i = 0; i < arrayOfObjs.length; i++) {
//     const one = new User({
//       id: arrayOfObjs[i].id,
//       name: arrayOfObjs[i].name,
//       pic: arrayOfObjs[i].pic,
//       email: arrayOfObjs[i].email,
//       bio: arrayOfObjs[i].bio
//     });
//     one.save();
//     // console.log("ONE WAS ADDED");
//   }
// };
// saveUsers(dummy);


// const saveArt = function(arrayOfObjs) {
//   for (var i = 0; i < arrayOfObjs.length; i++) {
//     const one = new Article({
//       id: arrayOfObjs[i].id,
//       authorId: arrayOfObjs[i].authorId,
//       title: arrayOfObjs[i].title,
//       subTitle: arrayOfObjs[i].subTitle,
//       pic: arrayOfObjs[i].pic,
//       createdAt: arrayOfObjs[i].createdAt,
//       readingTime: arrayOfObjs[i].readingTime,
//       text: arrayOfObjs[i].text,
//       clapsNumber: arrayOfObjs[i].clapsNumber,
//       comments: arrayOfObjs[i].comments,
//       suggested: arrayOfObjs[i].suggested,
//       tags: arrayOfObjs[i].tags
//     });
//     one.save();
//     // console.log("ONE WAS ADDED");
//   }
// };

// module.exports.saveUsers = saveUsers;
// module.exports.saveArt = saveArt;
module.exports.selectAll = selectAll;
module.exports.User = User;
module.exports.Article = Article;
