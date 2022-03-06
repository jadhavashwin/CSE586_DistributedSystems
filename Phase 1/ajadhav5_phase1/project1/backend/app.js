const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8090;

app.use(express.json());
app.use(cors());

const mongo_util = require("./mongo_util");

mongo_util.connectToServer(function (err) {
  var indexRouter = require("./routes/index");
  app.use("/", indexRouter);
});

app.listen(port, (req, res) => {
  console.log("Started Node JS Backend Application !!!");
});

module.exports = app;
