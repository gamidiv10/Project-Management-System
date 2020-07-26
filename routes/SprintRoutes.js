const { Router } = require("express");
const {
  createSprint,
  updateSprint,
  deleteSprint,
  getSprints,
  addIssueToSprint,
  removeIssueFromSprint,
} = require("../controllers/SprintController");

const router = Router();

router.post("/createSprint", createSprint);
router.put("/updateSprint", updateSprint);
router.delete("/deleteSprint", deleteSprint);
router.post("/getSprints", getSprints);
router.post("/addIssueToSprint", addIssueToSprint);
router.post("/removeIssueFromSprint", removeIssueFromSprint);

module.exports = router;
