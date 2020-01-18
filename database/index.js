const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
mongoose.set('useFindAndModify', false);

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

    // check database for entry to be updated, else create
    Repo.findOneAndUpdate(
      { id: repoDoc.id }, 
      repoDoc,
      { upsert: true },
      (err) => {
        if (err) {
          callback(err);
        } else {
          console.log("Successful DB Entry Made: ", repoDoc.name);

          if(key === repoArray.length - 1) {
            callback(null);
          }
        }
    });

  });
}

let load = (filterOptions = {}, callback) => {
  // function should call the top 25 according to some filter
  // from database and return it to the front end
  var queryOptions = {
    sort: { 'owner.userName': 1 },
    limit: 25
  };

  // filter, 'projection', options, callback
  Repo.find(filterOptions, null, queryOptions, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports.save = save;
module.exports.load = load;