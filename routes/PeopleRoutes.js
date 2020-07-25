/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
const express = require("express");

const {
  inviteUser,
  getPeople,
  addUser,
  getPeopleByProject,
} = require("../controllers/PeopleController");

const router = express.Router();

//Add User Route
router.route("/addUser").post(addUser);

//Invite User Route
router.route("/inviteUser").post(inviteUser);

//Load Users Route
router.route("/getPeople").get(getPeople);

//Load Users by Project Route
router.route("/getPeopleByProject/:projectName").get(getPeopleByProject);

module.exports = router;
