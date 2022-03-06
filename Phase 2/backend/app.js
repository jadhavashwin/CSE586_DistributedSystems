const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8090;

app.use(express.json());
app.use(cors());

console.log("Normal Port: " + process.env.PORT);

const mongo_util = require("./mongo_util");

mongo_util.connectToServer(function (err) {
  var indexRouter = require("./routes/index");
  app.use("/", indexRouter);
});

app.listen(port, (req, res) => {
  console.log(process.env.IS_LEADER || false);
  console.log("Started Node JS Backend Application !!!");
});

module.exports = app;
