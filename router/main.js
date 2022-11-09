var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();

router.get("/", function (req, res) {
  //res.send("hi friend!"); // body로 보내짐.
  res.sendFile(path.join(__dirname + "/../public/main.html"));
});

module.exports = router;
