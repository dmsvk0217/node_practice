var express = require("express");
var app = express();
var router = require("./router/index");

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
app.use(router);
