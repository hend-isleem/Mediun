/* eslint-disable comma-dangle */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function sendFromProxyToModuleServers(url, res) {
  request.get(url);
}

app.get('/:id', (req, res) => {
  const { id } = req.params;

  // sendFromProxyToModuleServers(`http://localhost:3001/navbar/${id}`, res);
  sendFromProxyToModuleServers(
    `https://young-hamlet-30035.herokuapp.com/navbar/${id}`,
    res
  );

  sendFromProxyToModuleServers(
    `https://evening-stream-39951.herokuapp.com/article/${id}`,
    res
  );
  sendFromProxyToModuleServers(
    `https://young-river-75124.herokuapp.com/responses/${id}`,
    res
  );
  sendFromProxyToModuleServers(
    `https://afternoon-hamlet-52294.herokuapp.com/recommendations/${id}`,
    res
  );
  res.status(204).send();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}../public`));
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
