var express = require("express");
var app = express();

//libs
var bodyParser = require("body-parser");
var cors = require("cors");

//routers
var main = require("./router/main");
var email = require("./router/email");

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

app.get("/", function (req, res) {
  //res.send("hi friend!"); // body로 보내짐.
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/search", function (req, res) {
  var responseData = {
    result: "ok",
    content: ` ${req.body.word}에 대한 검색 결과는 다음과 같습니다. ~~~~~~~~~~~~~~ 끝.`,
  };
  res.json(responseData); // 자동으로 json으로 변환하여서 send 해줌.
});
