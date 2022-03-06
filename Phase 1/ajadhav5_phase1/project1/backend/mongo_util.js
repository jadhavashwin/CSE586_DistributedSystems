const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://mongo:27017";

var _db;
module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(url, function (err, client) {
      _db = client.db("ds_project_db");
      console.log("Connected to Database");
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};
