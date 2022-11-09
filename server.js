var express = require("express");
var app = express();

//libs
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql");

//routers
var main = require("./router/main");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "asdf456852",
  database: "nodep",
});

connection.connect();

app.listen(3000, function () {
  console.log("server start!");
});

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/main", main);

app.get("/", function (req, res) {
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
  var email = req.body.email;
  var responseData = {};

  var query = connection.query(
    'select name from user where email = "' + email + '"',
    function (err, rows) {
      if (err) throw err;
      if (rows[0]) {
        responseData = { result: "ok", name: rows[0].name };
      } else {
        responseData = { result: "false", name: "" };
      }
      res.json(responseData);
    }
  );

  // console.log("!!server object is " + responseData);
  // res.json(responseData);
});

app.post("/search", function (req, res) {
  var responseData = {
    result: "ok",
    content: ` ${req.body.word}에 대한 검색 결과는 다음과 같습니다. ~~~~~~~~~~~~~~ 끝.`,
  };
  res.json(responseData); // 자동으로 json으로 변환하여서 send 해줌.
});
