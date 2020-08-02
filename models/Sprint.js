const mongoose = require("mongoose");
const Issue = require("./Issue");

const SprintSchema = new mongoose.Schema({
  sprintNumber: {
    type: Number,
    required: true,
    default: 0,
  },
  projectId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  issues: {
    type: [Issue.Schema],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Sprint", SprintSchema);
