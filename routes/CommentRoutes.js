/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */

const express = require("express");

const {
  addComment,
  getComments,
  editComment,
  deleteComment,
} = require("../controllers/CommentsController");

const router = express.Router();

//Add Comment Route
router.route("/addComment").post(addComment);

//Edit Comment Route
router.route("/editComment").put(editComment);

// Get Comment Route
router.route("/getComments/:id").get(getComments);

//Delete Comment Route
router.route("/deleteComment/:commentId").delete(deleteComment);

module.exports = router;
