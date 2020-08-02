const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  projectId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: true,
  },
  isPartOfSprint: {
    type: Boolean,
    required: true,
    default: false,
  },
});
module.exports = mongoose.model("Issue", IssueSchema);
