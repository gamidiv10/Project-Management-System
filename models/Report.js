/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "Project Name is required"],
  },
  sprint: {
    type: Number,
    required: [true, "Sprint is required"],
  },
  plannedPoints: {
    type: Number,
    required: [true, "Planned Points is required"],
  },
  completedPoints: {
    type: Number,
    required: [true, "Completed Points is required"],
  },
});

module.exports = mongoose.model("Report", ReportSchema);
