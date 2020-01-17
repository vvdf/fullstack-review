const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  owner: { userId: Number, userName: String },
  url: String,
  description: String,
  createdAt: String, // possibly a Date
  updatedAt: String, // "
  language: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoArray, callback = null) => {
  // This function should save a repo or repos to
  // the MongoDB
  repoArray.forEach((repo, key) => {
    console.log(key, Object.keys(repo));
    // Repo.create();
  });
}

module.exports.save = save;