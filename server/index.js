const express = require('express');
const path = require('path');
const { getReposByUsername } = require('../helpers/github');
const { save, load } = require('../database');
let app = express();

app.use(express.text());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  var userName = req.body;

  getReposByUsername(userName, (err, data) => {
    var repos = JSON.parse(data);
    var responseMessage = err ? 'User not found' : 'User found'
    if (err) {
      console.log(err);
      res.status(400).send(responseMessage);
    } else if (repos.items.length > 0) {
      save(repos.items, (err) => {
        if (err) {
          res.status(500).send(responseMessage + ', Database Error');
        } else {
          res.status(200).send(responseMessage);
        }
      });
    } else {
      // User returned 0 public repos, nothing to save to DB
      res.status(200).send(responseMessage + ', User has no public repos to add');
    }
  });
});

app.get('/repos', function (req, res) {
  //  respond with repos from database
  load(null, (err, data) => {
    res.status(200).send(data);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

