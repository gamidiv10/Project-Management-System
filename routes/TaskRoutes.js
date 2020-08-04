/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

const express = require("express");

const {
  addTask,
  editTask,
  getTaskByStatus,
  changeTaskByStatus,
  getTasks,
  getCalendarViewTasks,
  updateTaskStatus,
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
router.route("/changeTaskByStatus/:status/:id/:user").put(changeTaskByStatus);

// Update task by status route
router.route("/updateTaskStatus/:sprintNumber/:id").put(updateTaskStatus);

router.route("/calendar").get(getCalendarViewTasks);

module.exports = router;
