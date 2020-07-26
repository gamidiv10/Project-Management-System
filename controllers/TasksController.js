/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */
const Task = require("../models/Task");

// add task post request
exports.addTask = async (req, res) => {
  try {
    console.log("task", req.body);
    const task = await Task.create(req.body);
    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      console.log(error);
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

// edit task put request
exports.editTask = async (req, res, next) => {
  try {
    console.log("request", req.body);
    const task = await Task.updateOne(
      { id: req.body.id },
      {
        $set: {
          projectName: req.body.projectName,
          issueType: req.body.issueType,
          summary: req.body.summary,
          description: req.body.description,
          priority: req.body.priority,
          assignee: req.body.assignee,
        },
      }
    );
    return res.status(201).json({
      success: true,
      data: task,
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

// get tasks get request
exports.getTasks = async (req, res) => {
  var projectName = req.params.projectName;
  var sprintNo = req.params.sprintNumber;
  try {
    const tasks = await Task.find({
      projectName: projectName,
      sprintNumber: sprintNo,
    });
    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error ${error}`,
    });
  }
};

// get tasks by status get request
exports.getTaskByStatus = (req, res) => {
  var projectName = req.params.projectName;
  var status = req.params.status;
  var sprintNo = req.params.sprintNumber;
  Task.find({
    projectName: projectName,
    taskStatus: status,
    sprintNumber: sprintNo,
  })
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

// change tasks by status post request
exports.changeTaskByStatus = (req, res) => {
  var id = req.params.id;
  var status = req.params.status;

  Task.updateOne({ id: id }, { $set: { taskStatus: status } })
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
