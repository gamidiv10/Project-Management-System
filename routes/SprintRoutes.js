const express = require("express");
const {
  createSprint,
  updateSprint,
  deleteSprint,
  getSprints,
  taskToSprintUpdate,
  getTasksForSprint,
  completeSprint,
  startSprint
} = require("../controllers/SprintController");

const router = express.Router();

router.post("/createSprint", createSprint);
router.post("/updateSprint", updateSprint);
router.post("/deleteSprint", deleteSprint);
router.post("/getSprints", getSprints);
router.post("/taskToSprintUpdate", taskToSprintUpdate);
router.post("/getTasksForSprint", getTasksForSprint);
router.post("/completeSprint", completeSprint);
router.post("/startSprint", startSprint);

module.exports = router;
