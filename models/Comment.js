/* Author - Satya Kumar Itekela */

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Task Id is required"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
  userName: {
    type: String,
    required: [true, "User Name is required"],
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
