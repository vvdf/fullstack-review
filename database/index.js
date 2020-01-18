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

let save = (repoArray, callback) => {
  // This function should save a repo or repos to
  // the MongoDB
  let itemsCreated = 0;

  repoArray.forEach((repo, key) => {
    let repoDoc = {
      id: repo.id,
      name: repo.name,
      owner: { userId: repo.owner.id, userName: repo.owner.login },
      url: repo.html_url,
      description: repo.description,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      language: repo.language
    };

    Repo.create(repoDoc, (err) => {
      if (err) {
        callback(err);
      } else {
        itemsCreated++;
        console.log("Successful DB Entry Added: ", repoDoc.name);

        if(itemsCreated === repoArray.length - 1) {
          callback(null);
        }
      }
    });

  });
}

module.exports.save = save;