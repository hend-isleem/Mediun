const express = require('express');
const bodyParser = require('body-parser');
const SSE = require('express-sse');
const path = require('path');
const db = require('../database-mongo/index');

const port = process.env.PORT || 3004;

const app = express();

app.use(express.static(__dirname + "/../public"));
// app.use(express.static(path.join(`${__dirname}/../public`)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sse = new SSE();
const articleModel = db.Article;
const userModel = db.User;

// open channel at /stream so we can send from server to client through this channel
app.get('/stream', sse.init);

app.get('/recommendations/:id', (req,res) => {
  // TODO: your code here
  // console.log("inside")
  // const { id } = req.params;
  const allData = {};
  // console.log(id);
  db.selectAll(userModel, (err, users) => {
    if (err) {
      throw err;
    }else{
        allData["users"] = users;
        db.selectAll(articleModel, (err, arts) => {
          if (err) {
            throw err;
          }else{
            // console.log('arts are: ', arts);
            allData["articles"] = arts;
            sse.send(allData);
            console.log('alldata is sent! ', allData);
            res.status(204).send();
            // res.sendStatus(204);
          }
        });
    }   
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public`));
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
