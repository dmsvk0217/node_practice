var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

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
router.get("/", function (req, res) {
  console.log("init session is : ", req.session);
  var msg;
  var errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  res.render("register.ejs", { message: msg });
});

passport.serializeUser(function (user, done) {
  //  LocalStrategy에서 done으로 넘겨준 user 객체로 들어옴
  console.log("this is serializeUser");
  process.nextTick(function () {
    return done(null, {
      id: user.id,
    });
  });
});

passport.deserializeUser(function (id, done) {
  //  serializeUser에서 done으로 넘겨준 객체로 들어옴
  console.log("this is deserializeUser! id: ", id);
  process.nextTick(function () {
    return done(null, id);
  });
});

passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      console.log("h1h1h1h1");
      var query = connection.query(
        "select * from user where email=?",
        [email],
        function (err, user) {
          if (err) return done(err);
          if (user.length) {
            // 있음 -> 중복되는 이메일 계정이므로 no
            console.log("user register no!");
            return done(null, false, { message: "your email is already used" });
          } else {
            // 없음 -> 처음만드는 계정이므로 ok
            console.log("user register ok!");
            var sql = { email: email, password: password };
            var query = connection.query(
              "insert into user set ?",
              sql,
              function (err, rows) {
                if (err) throw err;
                return done(null, { email: email, id: rows.insertId });
              }
            );
          }
        }
      );
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-register", {
    successRedirect: "/main",
    failureRedirect: "/register",
    failureFlash: true,
  })
);

module.exports = router;
