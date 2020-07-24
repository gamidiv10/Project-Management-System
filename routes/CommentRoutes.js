/* Author - Satya Kumar Itekela */

const express = require("express");

const {
  addComment,
  getComments,
} = require("../controllers/CommentsController");

const router = express.Router();

router.route("/addComment").post(addComment);

router.route("/getComments/:id").get(getComments);

module.exports = router;
