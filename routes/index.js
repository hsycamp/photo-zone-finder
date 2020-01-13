const express = require("express");
const router = express.Router();
const mainRouter = require("./main");
const usersRouter = require("./users");
const authRouter = require("./auth");
const postRouter = require("./post");
const detailRouter = require("./detail");
const commentRouter = require("./comment");

router.use("/", mainRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/detail", detailRouter);
router.use("/comment", commentRouter);

module.exports = router;
