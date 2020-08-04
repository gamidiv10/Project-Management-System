/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Task Id is required"],
    unique: [true, "Task Id must be unique"],
  },
  projectName: {
    type: String,
    required: [true, "Project Name is required"],
  },
  issueType: {
    type: String,
    required: [true, "Issue Type is required"],
  },
  summary: {
    type: String,
    required: [true, "Summary is required"],
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    required: [true, "Priority is required"],
  },
  assignee: {
    type: String,
    required: [true, "Assignee is required"],
  },
  sprintNumber: {
    type: Number,
    required: [true, "Sprint number is required"],
  },
  taskStatus: {
    type: String,
    required: [true, "Task Status is required"],
  },
  storyPoints: {
    type: Number,
    required: [true, "Story Points is required"],
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
