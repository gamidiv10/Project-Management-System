/* Author - Satya Kumar Itekela */

const express = require("express");

const {
  addComment,
  getComments,
  editComment,
  deleteComment,
} = require("../controllers/CommentsController");

const router = express.Router();

router.route("/addComment").post(addComment);

router.route("/editComment").put(editComment);

router.route("/getComments/:id").get(getComments);

router.route("/deleteComment/:commentId").delete(deleteComment);

module.exports = router;
