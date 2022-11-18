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

//login router -> 로그인 페이지.
router.get("/", function (req, res) {
  var msg;
  var errMsg = req.flash("error");
  if (errMsg) msg = errMsg;

  console.log("login page");
  console.log("login session is : ", req.session);
  res.render("login.ejs", { message: msg });
});

passport.serializeUser(function (user, done) {
  console.log("this is serializeUser");
  process.nextTick(function () {
    return done(null, user.id);
  });
});

passport.deserializeUser(function (id, done) {
  console.log("this is deserializeUser! id: ", id);
  process.nextTick(function () {
    return done(null, id);
  });
});

/*
세션기반 로그인 구현방식
email, password 해당하는 것이 있다면
새션을 생성하고 /main으로 routing
*/
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      console.log("email : ", email);
      console.log("password : ", password);
      var query = connection.query(
        "select * from user where email=? and password=?", //, password=?
        [email, password],
        function (err, rows) {
          if (err) return done(err);
          if (rows.length) {
            // 있음 -> 로그인 성공.
            console.log("login success!");
            return done(null, { email: email, id: rows[0].UID });
          } else {
            // 없음 -> 없는 계정임.
            console.log("login fail!");
            return done(null, false, { message: "user doesn't exist" });
          }
        }
      );
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-login", { failureRedirect: "/" }),
  function (req, res) {
    console.log(req.user);
    req.login(req.user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/main");
    });
  }
);

module.exports = router;
