var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();

router.post("/", function (req, res) {
  var responseData = {
    result: "ok",
    content: ` ${req.body.word}에 대한 검색 결과는 다음과 같습니다. ~~~~~~~~~~~~~~ 끝.`,
  };
  res.json(responseData);
});

router.post("/ejs", function (req, res) {
  res.render("search.ejs", {
    word: req.body.word,
    content: ` ${req.body.word}에 대한 검색 결과는 다음과 같습니다. ~~~~~~~~~~~~~~ 끝.`,
  });
});

module.exports = router;
