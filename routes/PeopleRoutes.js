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

router.route("/addUser").post(addUser);

router.route("/inviteUser").post(inviteUser);

router.route("/getPeople").get(getPeople);

router.route("/getPeopleByProject/:projectName").get(getPeopleByProject);

module.exports = router;
