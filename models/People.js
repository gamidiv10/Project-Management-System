/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
const mongoose = require("mongoose");

const PeopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  projectName: {
    type: String,
    required: [true, "Project Name is required"],
  },
  projectKey: {
    type: String,
    required: [true, "Project Key is required"],
  },
  projectLead: {
    type: String,
    required: [true, "Project Lead is required"],
  },
});

module.exports = mongoose.model("People", PeopleSchema);
