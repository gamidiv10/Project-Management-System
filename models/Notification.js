/**
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "Project Name is required"],
  },
  taskName: {
    type: String,
    required: [true, "Task Name is required"],
  },
  type: {
    type: String,
    required: [true, "Notification Type is required"],
  },
  user: {
    type: String,
    required: [true, "User is required"],
  },
  updates: String,
  createdAt: {
    type: Date,
    default: Date.now,
    // required: [true, "Task created at required"]
  },
  for: String,
  read: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Notification", NotificationSchema);
