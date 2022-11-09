var express = require("express");
var app = express();

//libs
var bodyParser = require("body-parser");
var cors = require("cors");

//routers
var main = require("./router/main");
var email = require("./router/email");
var search = require("./router/search");

app.listen(3000, function () {
  console.log("server start!");
});

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/main", main);
app.use("/email", email);
app.use("/search", search);

app.get("/", function (req, res) {
  //res.send("hi friend!"); // body로 보내짐.
  res.sendFile(__dirname + "/public/main.html");
});
