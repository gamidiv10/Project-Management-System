const Sprint = require("../models/Sprint");
const Issue = require("../models/Issue");

exports.createSprint = (req, res) => {
  const sprint = {
    name: req.body.name,
    goal: req.body.goal,
    description: req.body.description ? req.body.description : "",
  };
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
  const sprint = {
    name: req.body.name,
    goal: req.body.goal,
    description: req.body.description ? req.body.description : "",
  };
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
      res.send({
        success: true,
        isError: false,
        message: "Sprint successfully got deleted.",
      });
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
  const query = req.body.sprintId ? { _id: req.body.sprintId } : {};
  Sprint.find(query)
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
