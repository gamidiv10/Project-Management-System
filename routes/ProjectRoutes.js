const express = require('express');

const { getReportData } = require('../controllers/ReportsController');
const { createProject } = require('../controllers/ProjectController');

const router = express.Router();

router
    .route('/getReportData')
    .get(getReportData)

router
    .route('/createProject')
    .post(createProject)

module.exports = router;