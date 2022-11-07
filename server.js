var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.listen(3000, function () {
  console.log("server start!");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  //res.send("hi friend!"); // body로 보내짐.
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", function (req, res) {
  //res.send("hi friend!"); // body로 보내짐.
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", function (req, res) {
  console.log(req.body.email);
  //res.send("<h1>welcome" + req.body.email + "</h1>");
  res.render("email.ejs", { email: req.body.email });
});