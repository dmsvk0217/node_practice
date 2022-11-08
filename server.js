var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.listen(3000, function () {
  console.log("server start!");
});

app.use(express.static("public"));
app.use(cors());
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

app.post("/ajax_send_email", function (req, res) {
  console.log(req.body);
  var responseData = { result: "ok", email: req.body.email };

  console.log("!!server object is " + responseData);
  res.json(responseData);
});

app.post("/search", function (req, res) {
  console.log("req.body is " + req.body);
  var responseData = {
    result: "ok",
    content: ` ${req.body.word}에 대한 검색 결과는 다음과 같습니다. ~~~~~~~~~~~~~~ 끝.`,
  };
  res.json(responseData);
});
