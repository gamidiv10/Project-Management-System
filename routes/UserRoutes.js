/**
 * @author Vali Shaik
 */
const express = require("express");

const {
  addUser,
  getUser,
  modifyUser,
} = require("../controllers/UserController");
const router = express.Router();
router.route("/addUser").post(addUser);
router.route("/getUser/:userfield").get(getUser);
router.route("/modifyUser").post(modifyUser);
module.exports = router;
