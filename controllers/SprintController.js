const Sprint = require("../models/Sprint");
const Issue = require("../models/Issue");

exports.createSprint = (req, res) => {
  const sprint = {
    name: req.body.name,
    goal: req.body.goal,
    projectId: req.body.projectId,
    description: req.body.description ? req.body.description : "",
  };
  if(!(sprint.name || sprint.goal || sprint.projectId)) {
    res.send({
      success: false,
      isError: false,
      message: 'Some data seems missing. Make sure you are providing mandatory parameters i.e. sprint name, sprint goal and projectId.'
    })
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
      res.send({
        success: false,
        isError: true,
        error,
        message: "Error occurred while creating sprint.",
      });
    });
};
exports.updateSprint = (req, res) => {
  const sprintId = req.body.sprintId
  const sprint = {
    name: req.body.name,
    goal: req.body.goal,
    projectId: req.body.projectId,
    description: req.body.description ? req.body.description : "",
  };
  if(!(sprintId || sprint.name || sprint.goal || sprint.projectId)) {
    res.send({
      success: false,
      isError: false,
      message: 'Some data seems missing. Make sure you are providing mandatory parameters i.e. sprintId, sprint name, sprint goal and projectId.'
    })
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
  if (!(req.body.projectId || req.body.sprintId)) {
    res.send({
      success: false,
      isError: false,
      message: 'Some input data seems missing. Make sure to provide projectId and sprintId for deleting a sprint.'
    })
  }
  Sprint.findOneAndDelete({ _id: req.body.sprintId })
    .then((deletedSprint) => {
      if (deletedSprint && deletedSprint.issues !== []) {
        deletedSprint.issues.map((issueId) => {
          Issue.findOneAndUpdate(
            { _id: issueId },
            { isPartOfSprint: false },
            { new: true }
          ).catch((err1) => {
            res.send({
              success: false,
              isError: true,
              error: err1,
              message: "Error occurred while updating Issues for Sprint.",
            });
          });
        });
      }
      this.getSprints(req, res)
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
  const projectId = req.body.projectId
  
  if (!projectId) {
    res.send({
      success: false,
      isError: false,
      message: 'Provided project Id is not valid.'
    })
  }
  Sprint.find({ projectId })
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

exports.addIssueToSprint = (req, res) => {
  Issue.findOne({ _id: req.body.issueId })
    .then((issue) => {
      if (issue) {
        Sprint.findOne({ _id: req.body.sprintId }).then((sprintFound) => {
          if (sprintFound) {
            const sprint = sprintFound;
            sprint.issues.push(issue);
            Sprint.findOneAndUpdate({ _id: req.body.sprintId }, sprint, {
              new: true,
            }).then((updatedSprint) => {
              if (updatedSprint) {
                Issue.findOneAndUpdate(
                  { _id: req.body.issueId },
                  { isPartOfSprint: true },
                  { new: true }
                ).then((updatedIssue) => {
                  res.send({
                    success: true,
                    isError: false,
                    issue: updatedIssue,
                    sprint: updatedSprint,
                    message: "Successfully added issue to the sprint.",
                  });
                });
              }
            });
          } else {
            res.send({
              success: false,
              isError: false,
              message: "No Sprint with provided sprintId found.",
            });
          }
        });
      } else {
        res.send({
          success: false,
          isError: false,
          message: "No issue with provided issueId found.",
        });
      }
    })
    .catch((error) => {
      res.send({
        success: false,
        isError: false,
        error,
        message: "Error occurred while looking for an issue.",
      });
    });
};

exports.removeIssueFromSprint = (req, res) => {
  let sprint = {};

  Issue.findOne({ _id: req.body.issueId })
    .then((issue) => {
      if (issue) {
        console.log("__Issue Found", issue);
        Sprint.findOne({ _id: req.body.sprintId }).then((sprintFound) => {
          if (sprintFound) {
            sprint = sprintFound;
            sprintFound.issues.map((issue, index) => {
              if (issue._id.toString() === req.body.issueId) {
                console.log("__Sprint Found__", index);
                sprint.issues.splice(index, 1);
                console.log("_Issues", sprint);
                Sprint.findOneAndUpdate({ _id: req.body.sprintId }, sprint, {
                  new: true,
                }).then((updatedSprint) => {
                  if (updatedSprint) {
                    Issue.findOneAndUpdate(
                      { _id: req.body.issueId },
                      { isPartOfSprint: false },
                      { new: true }
                    ).then((updatedIssue) => {
                      res.send({
                        success: true,
                        isError: false,
                        issue: updatedIssue,
                        sprint: updatedSprint,
                        message: "Successfully removed issue from the sprint.",
                      });
                    });
                  }
                });
              }
            });
          } else {
            res.send({
              success: false,
              isError: false,
              message: "No Sprint with provided sprintId found.",
            });
          }
        });
      } else {
        res.send({
          success: false,
          isError: false,
          message: "No issue with provided issueId found.",
        });
      }
    })
    .catch((error) => {
      res.send({
        success: false,
        isError: false,
        error,
        message: "Error occurred while looking for an issue.",
      });
    });
};
