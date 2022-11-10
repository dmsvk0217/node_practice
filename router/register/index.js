var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();
var mysql = require("mysql");
const { render } = require("ejs");

//mysql db
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "asdf456852",
  database: "nodep",
});

connection.connect();

//register router
router.post("/", function (req, res) {
  console.log(req.body.email);
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;

  var sql = { name: name, email: email, pw: password };
  var qurey = connection.query(
    "insert into user set ?",
    sql,
    function (err, rows) {
      if (err) throw err;
      else {
        console.log("db insert done" + JSON.stringify(rows));
        res.render("welcome.ejs", { name: name, id: rows.insertId });
      }
    }
  );
});

module.exports = router;
