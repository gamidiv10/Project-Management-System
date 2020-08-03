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

//Create Project Route
router.route("/createProject").post(createProject);

//Edit Project Route
router.route("/editProject").post(editProject);

//Load all projects Route
router.route("/getProjects/:userName").get(getProjects);

module.exports = router;
