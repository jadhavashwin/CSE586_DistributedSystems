var express = require("express");
var router = express.Router();
var mongodbutil = require("../mongo_util");
var db = mongodbutil.getDb();

router.get("/test_get", (req, res, next) => {
  res.json({
    message: "Success",
  });
});

router.post("/send_message", (req, res) => {
  db.collection("messages")
    .insertOne({
      message: req.body.input_message,
    })
    .then((result) => {
      res.json({
        message:
          req.body.input_message +
          " Stored with Id: " +
          result.insertedId.toString(),
      });
    })
    .catch((error) => console.error(error));
});

router.get("/previous_messages", (req, res) => {
  db.collection("messages")
    .find()
    .limit(10)
    .toArray()
    .then((result) => {
      var arr = [];
      result.forEach((element) => {
        arr.push(element);
      });
      res.json({
        payload: arr,
      });
    });
});

module.exports = router;
