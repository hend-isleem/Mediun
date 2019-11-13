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

app.get('/article/:id', (req) => {
  // TODO: your code here
  const { id } = req.params;
  db.selectAll(userModel, id, (err, result) => {
    if (err) {
      throw err;
    } else {
      sse.send(result);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public`));
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
