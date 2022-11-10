const { render } = require("ejs");
var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();

router.get("/", function (req, res) {
  //res.send("hi friend!"); // body로 보내짐.
  //console.log("passport가 넘겨준 객체 : ", req.user);
  var id = req.user.id;
  //res.sendFile(path.join(__dirname + "/../../public/main.html"));
  res.render("main.ejs", { id: id });
});

module.exports = router;
