/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
const express = require("express");

const { getReportData } = require("../controllers/ReportController");

const router = express.Router();

router.route("/getReportData/:projectName").get(getReportData);

module.exports = router;
