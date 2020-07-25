/**
 * @author Vali Shaik
 */
const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  jobTitle: { type: String, required: true },
  department: { type: String, required: true },
  organisation: { type: String, required: true },
  country: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
