/**
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

const express = require("express");

const { getNotifications, markAsRead } = require("../controllers/NotificationController");

const router = express.Router();

// Get all notiifcations for given projects
router.route("/list").get(getNotifications);

router.route("/markAsRead/:id").get(markAsRead)

module.exports = router;
