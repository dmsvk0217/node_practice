var express = require("express");
const { builtinModules } = require("module");
var app = express();
var path = require("path");
var router = express.Router();

var main = require("./main/main");
var email = require("./email/email");
var search = require("./search/search");
var register = require("./register/index");

router.use("/main", main);
router.use("/email", email);
router.use("/search", search);
router.use("/register", register);

router.get("/", function (req, res) {
  //res.send("hi friend!"); // body로 보내짐.
  res.sendFile(path.join(__dirname + "/public/main.html"));
});

module.exports = router;
