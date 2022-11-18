var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();

//login시에만 main page 접근가능.
router.get("/", function (req, res) {
  //res.send("hi friend!"); // body로 보내짐.
  //console.log("passport가 넘겨준 객체 : ", req.user);
  //res.sendFile(path.join(__dirname + "/../../public/main.html"));
  var user = req.user; // passport가 보내준 객체.
  if (!user) res.render("login.ejs", { message: "" });
  else res.render("main.ejs", { id: user.id });
  console.log("passport session is : ", user);
});

module.exports = router;
