var express = require("express");
var app = express();
var router = require("./router/index");
var passport = require("passport");
var LocalStractegy = require("passport-local").Strategy;
var session = require("express-session");
var flash = require("connect-flash");

//libs
var bodyParser = require("body-parser");
var cors = require("cors");

app.listen(3000, function () {
  console.log("server start!");
});

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(router);
