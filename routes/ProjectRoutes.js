/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
const express = require("express");

const {
  createProject,
  editProject,
  getProjects,
} = require("../controllers/ProjectController");

const router = express.Router();

router.route("/createProject").post(createProject);

router.route("/editProject").post(editProject);

router.route("/getProjects").get(getProjects);

module.exports = router;
