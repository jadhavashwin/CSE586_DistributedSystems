const MongoClient = require("mongodb").MongoClient;
const mongo_name = process.env.MONGO_NAME;
const mongo_port = 27017;
const url = `mongodb://${mongo_name}:${mongo_port}`;

var _db;
module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(url, function (err, client) {
      console.log("Mongo Name: " + process.env.MONGO_NAME);
      _db = client.db("ds_project_db");
      console.log("Connected to Database");
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};
