var express = require("express");
const { builtinModules } = require("module");
var app = express();
var path = require("path");
var router = express.Router();

var main = require("./main/main");
var email = require("./email/email");
var search = require("./search/search");
var register = require("./register/register");
var login = require("./login/login");
var logout = require("./logout/logout");

router.use("/main", main);
router.use("/email", email);
router.use("/search", search);
router.use("/register", register);
router.use("/login", login);
router.use("/logout", logout);

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/../public/main.html"));
});

module.exports = router;
