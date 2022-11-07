var express = require("express");
var app = express();
app.listen(3000, function () {
  console.log("server start!");
});

app.use(express.static("public"));

app.get("/", function (req, res) {
  //res.send("hi friend!"); // body로 보내짐.
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", function (req, res) {
  //res.send("hi friend!"); // body로 보내짐.
  res.sendFile(__dirname + "/public/main.html");
});
