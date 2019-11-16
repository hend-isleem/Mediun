const express = require('express');
const bodyParser = require('body-parser');
const SSE = require('express-sse');
const path = require('path');
const db = require('../database-mongo/index');

const port = process.env.PORT || 3002;

const app = express();

app.use(express.static(path.join(`${__dirname}/../public`)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sse = new SSE();
const articleModel = db.Article;
const userModel = db.User;

// open channel at /stream so we can send from server to client through this channel
app.get('/stream', sse.init);

app.get('/article/:id', (req, res) => {
  // TODO: your code here
  var result = {};
  const { id } = req.params;
  console.log(id);
  db.selectAll(articleModel, id, (err, article) => {
    if (err) {
      throw err;
    } else {
      result.article = article;
      db.getAuthor(userModel, article[0].id, function(user) {
        result.user = user;
        sse.send(result);
        res.status(204).send();
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
