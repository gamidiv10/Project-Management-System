/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */

const express = require("express");

const {
  addTask,
  editTask,
  getTaskByStatus,
  changeTaskByStatus,
  getTasks,
} = require("../controllers/TasksController");

const router = express.Router();

// Add Task Route
router.route("/addTask").post(addTask);

// Edit Task Route
router.route("/editTask").post(editTask);

// Get Tasks Route
router.route("/getTasks/:projectName/:sprintNumber").get(getTasks);

// Get Tasks By status Route
router
  .route("/getTaskByStatus/:projectName/:status/:sprintNumber")
  .get(getTaskByStatus);

// Change task by status route
router.route("/changeTaskByStatus/:status/:id").put(changeTaskByStatus);

module.exports = router;
