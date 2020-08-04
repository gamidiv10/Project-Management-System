const Sprint = require("../models/Sprint");
const Task = require("../models/Task");
const { editTask } = require("../controllers/TasksController");

exports.createSprint = (req, res) => {
  const sprint = {
    name: req.body.name,
    goal: req.body.goal,
    projectName: req.body.projectName,
    description: req.body.description ? req.body.description : "",
  };
  // default it is first sprint with sprint number 1
  if (!(sprint.name || sprint.goal || sprint.projectName)) {
    res.send({
      success: false,
      isError: false,
      message:
        "Some data seems missing. Make sure you are providing mandatory parameters i.e. sprint name, sprint goal and projectName.",
    });
  }
  Sprint.create(sprint)
    .then((createdSprint) => {
      res.send({
        success: true,
        sprint: createdSprint,
        message: "Successfully created Sprint.",
      });
    })
    .catch((error) => {
      console.log("Error", error);
      res.send({
        success: false,
        isError: true,
        error,
        message: "Error occurred while creating sprint.",
      });
    });
};
exports.updateSprint = (req, res) => {
  const sprintId = req.body.sprintId;
  const sprint = {
    name: req.body.name,
    goal: req.body.goal,
    projectName: req.body.projectName,
    description: req.body.description ? req.body.description : "",
  };
  if (!sprintId || !sprint.name || !sprint.goal || !sprint.projectName) {
    res.send({
      success: false,
      isError: false,
      message:
        "Some data seems missing. Make sure you are providing mandatory parameters i.e. sprintId, sprint name, sprint goal and projectName.",
    });
  }
  Sprint.findOneAndUpdate({ _id: req.body.sprintId }, sprint, { new: true })
    .then((updatedSprint) => {
      res.send({
        success: true,
        sprint: updatedSprint,
        message: "Successfully updated the Sprint.",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        isError: true,
        error,
        message: "Error occurred while updating existing sprint.",
      });
    });
};

exports.deleteSprint = (req, res) => {
  if (!req.body.projectName || !req.body.sprintId) {
    res.send({
      success: false,
      isError: false,
      message:
        "Some input data seems missing. Make sure to provide projectName, sprintId for deleting a sprint.",
    });
  }
  Sprint.findOneAndDelete({
    _id: req.body.sprintId,
    sprintNumber: req.body.sprintNumber,
  })
    .then((deletedSprint) => {
      if (deletedSprint && deletedSprint.sprintNumber) {
        Task.updateMany(
          {
            sprintNumber: deletedSprint.sprintNumber,
            projectName: req.body.projectName,
          },
          { sprintNumber: 0 }
        )
          .then((updatedTask) => {
            res.send({
              success: true,
              isError: false,
              message:
                "Successfully deleted the sprint and updated " +
                updatedTask.nModified +
                " task/s.",
            });
          })
          .catch((err1) => {
            res.send({
              success: false,
              isError: true,
              error: err1,
              message: "Error occurred while updating Tasks for the Sprint.",
            });
          });
      } else {
        res.send({
          success: false,
          isError: false,
          message: "No sprint with given id and/or sprintNumber is present.",
        });
      }
    })
    .catch((error) => {
      res.send({
        success: false,
        isError: true,
        error,
        message: "Error occurred while deleting Sprint.",
      });
    });
};

exports.getSprints = (req, res) => {
  const projectName = req.body.projectName;

  Sprint.find({ projectName })
    .exec()
    .then((sprints) => {
      res.send({
        success: true,
        isError: false,
        sprints,
        message: "Successfully fetched Sprints.",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        isError: true,
        error,
        message: "Error occurred in fetching Sprints.",
      });
    });
};

exports.taskToSprintUpdate = (req, res) => {
  const sprintNumber = req.body.sprintNumber;
  const taskId = req.body.taskId;
  const sprintId = req.body.sprintId;
  const updateSprintTo = req.body.updateSprintTo;

  if (!sprintNumber || !taskId || !sprintId || !updateSprintTo) {
    res.send({
      success: false,
      isError: false,
      message:
        "Some data seems missing. Make sure you are providing mandatory parameters i.e. sprintNumber taskId sprintId and updateSprintTo.",
    });
  }
  Task.find({ _id: taskId })
    .then((task) => {
      if (task) {
        Sprint.findOne({ _id: sprintId, sprintNumber }).then((sprintFound) => {
          if (sprintFound) {
            Task.findOneAndUpdate(
              { _id: taskId },
              { sprintNumber: updateSprintTo }
            )
              .then((updatedTask) => {
                if (updatedTask) {
                  res.send({
                    success: true,
                    isError: false,
                    task: updatedTask,
                    message: "Successfully updated task for the given sprint.",
                  });
                } else {
                  res.send({
                    success: false,
                    isError: false,
                    message: "There is no task which got updated.",
                  });
                }
              })
              .catch((updatingErr) => {
                res.send({
                  success: false,
                  isError: false,
                  error: updatingErr,
                  message:
                    "Error occurred while updating task for the given sprint.",
                });
              });
          } else {
            res.send({
              success: false,
              isError: false,
              message:
                "No Sprint with provided sprintId and sprintNumber found.",
            });
          }
        });
      } else {
        res.send({
          success: false,
          isError: false,
          message: "No Task with provided taskId found.",
        });
      }
    })
    .catch((error) => {
      res.send({
        success: false,
        isError: false,
        error,
        message: "Error occurred while looking for an Task.",
      });
    });
};

exports.getTasksForSprint = (req, res) => {
  const sprintNumber = req.body.sprintNumber;
  const sprintId = req.body.sprintId;

  if (!sprintNumber || !sprintId) {
    res.send({
      success: false,
      isError: false,
      message:
        "Some data seems missing. Make sure you are providing mandatory parameters i.e. sprintNumber and sprintId.",
    });
  }
  Sprint.find({ _id: sprintId, sprintNumber })
    .then(() => {
      Task.find({ sprintNumber }).then((tasks) => {
        res.send({
          success: true,
          isError: false,
          tasks,
          message: "Successfully fetched the tasks.",
        });
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        isError: true,
        error: err,
        message:
          "Error occurred while finding sprint with provided sprint data.",
      });
    });
};
exports.completeSprint = (req, res) => {
  const sprintNumber = req.body.sprintNumber;

  Sprint.updateOne(
    { sprintNumber: sprintNumber },
    { $set: { isSprintComplete: true, isActive: false } }
  )
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
