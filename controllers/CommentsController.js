/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 * @author Sneh Jogani <sjogani16@dal.ca>
 */
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const Task = require("../models/Task");

// Add Comment post request
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);

    const { body: { comment: commentText, id: taskId, userName } } = req
    // fetching task for which the comment was created to generate a notification for the same
    const task = await Task.findOne({ id: taskId }, 'projectName summary').exec()

    // generating notification data
    const notificationData = {
      projectName: task._doc['projectName'],
      taskName: task._doc['summary'],
      type: 'COMMENT_CREATE',
      user: userName,
      updates: JSON.stringify({ newValue: commentText })
    }

    // creating notification
    await Notification.create(notificationData)

    return res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      console.log("error:", error.message);
      return res.status(500).json({
        sucess: false,
        error: "Server Error",
      });
    }
  }
};

// Get comments get request
exports.getComments = (req, res) => {
  var id = req.params.id;
  Comment.find({ id: id })
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// edit comment put request
exports.editComment = async (req, res) => {
  try {
    const comment = await Comment.updateOne(
      { commentId: req.body.commentId },
      {
        $set: {
          comment: req.body.comment,
        },
      }
    );
    return res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      console.log("error:", error.message);
      return res.status(500).json({
        sucess: false,
        error: "Server Error",
      });
    }
  }
};

// delete comment delete request
exports.deleteComment = (req, res) => {
  var commentId = req.params.commentId;
  Comment.deleteOne({ commentId })
    .then((result) => {
      res.status(201).json({
        message: "Comment deleted",
      });
    })
    .catch((err) => console.log(err));
};
