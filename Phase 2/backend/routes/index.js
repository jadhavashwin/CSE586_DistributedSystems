var axios = require("axios");
var express = require("express");
var router = express.Router();
var mongodbutil = require("../mongo_util");
var db = mongodbutil.getDb();
const is_leader = process.env.IS_LEADER === "true" || false;

router.post("/send_message", (req, res) => {
  if (is_leader) {
    var responseList = [];
    save_in_db(req.body.input_message).then((localRes) => {
      console.log("Normal: " + localRes);
      responseList.push(localRes);
      var res1 = send_message_call(6, req.body.input_message);
      res1.then((r1) => {
        console.log("R1: " + r1);
        responseList.push(r1);
        send_message_call(7, req.body.input_message).then((r2) => {
          console.log("R2: " + r1);
          responseList.push(r2);
          res.json(responseList);
        });
      });
    });
  } else {
    save_in_db(req.body.input_message).then((db_res) => {
      res.json({ message: db_res });
    });
  }
});

const send_message_call = async (i, inputMessage) => {
  const res = await axios.post(`http://10.10.0.${i}:8090/send_message`, {
    input_message: inputMessage,
  });
  return await res.data.message;
};

const save_in_db = async (inputMessage) => {
  const db_saved = await db
    .collection("messages")
    .insertOne({ message: inputMessage });
  return await db_saved.insertedId.toString();
};

router.get("/previous_messages", (req, res) => {
  if (is_leader) {
    var responseList = [];
    get_messages_from_db().then((localRes) => {
      console.log("Normal: " + localRes);
      responseList.push(localRes);
      var res1 = get_messages_call(6);
      res1.then((r1) => {
        console.log("R1: " + r1);
        responseList.push(r1);
        get_messages_call(7).then((r2) => {
          console.log("R2: " + r1);
          responseList.push(r2);
          res.json(responseList);
        });
      });
    });
  } else {
    get_messages_from_db().then((db_res) => {
      res.json({ message: db_res });
    });
  }
});


const get_messages_call = async (i) => {
  const res = await axios.get(`http://10.10.0.${i}:8090/send_message`, {
  });
  return await res.data;
};

const get_messages_from_db = () => {
  db.collection("messages")
    .find()
    .limit(10)
    .toArray()
    .then((result) => {
      var arr = [];
      result.forEach((element) => {
        arr.push(element);
      });
      if (!is_leader) {
        return { 
          payload: arr,
        };
      } else {
        return {
          payload: arr,
        };
      }
    });
};

module.exports = router;