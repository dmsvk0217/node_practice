var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();
var mysql = require("mysql");

//mysql db
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "asdf456852",
  database: "nodep",
});

connection.connect();

//email router
router.post("/form", function (req, res) {
  console.log(req.body.email);
  res.render("email.ejs", { email: req.body.email }); // email.ejs 경로 설정 안해줘도 되는거임..????
});

router.post("/ajax", function (req, res) {
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
});

module.exports = router;
