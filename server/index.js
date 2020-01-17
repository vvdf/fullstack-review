const express = require('express');
const path = require('path');
const { getReposByUsername } = require('../helpers/github');
const { save } = require('../database');
let app = express();

app.use(express.text());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var userName = req.body;
  getReposByUsername(userName, (err, data) => {
    console.log(err, data);
  });
  console.log(req.body, req.url);
  res.status(200).send('Received');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

