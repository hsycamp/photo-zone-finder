const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

/* GET signIn page. */
router.get("/sign-in", (req, res, next) => {
  const flashMessage = req.flash('message');
  res.render("sign-in", { title: "로그인 페이지", errorMessage: flashMessage });
});

module.exports = router;
