const express = require("express");
const {
  createSprint,
  updateSprint,
  deleteSprint,
  getSprints,
  taskToSprintUpdate,
  getTasksForSprint,
  completeSprint
} = require("../controllers/SprintController");

const router = express.Router();

router.post("/createSprint", createSprint);
router.put("/updateSprint", updateSprint);
router.delete("/deleteSprint", deleteSprint);
router.post("/getSprints", getSprints);
router.put("/taskToSprintUpdate", taskToSprintUpdate);
router.post("/getTasksForSprint", getTasksForSprint);
router.post("/completeSprint", completeSprint);


module.exports = router;
