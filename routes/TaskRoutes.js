/* Author - Satya Kumar Itekela */

const express = require("express");

const {
  addTask,
  editTask,
  getTaskByStatus,
  changeTaskByStatus,
  getTasks,
} = require("../controllers/TasksController");

const router = express.Router();

router.route("/addTask").post(addTask);

router.route("/editTask").post(editTask);

router.route("/getTasks").get(getTasks);

router.route("/getTaskByStatus/:status/:sprintNumber").get(getTaskByStatus);

router.route("/changeTaskByStatus/:status/:id").put(changeTaskByStatus);

module.exports = router;
