const Issue = require("../models/Issue");
const Sprint = require("../models/Sprint")

exports.createIssue = (req, res) => {
  const issue = {
    type: req.body.type,
    name: req.body.name,
    projectId: req.body.projectId,
    description: req.body.description ? req.body.description : "",
  };
  if (!(issue.type || issue.name || issue.projectId)) {
    res.send({
      success: false,
      isError: false,
      message: 'Some data seems missing. Make sure you are providing mandatory parameters i.e. Issue name, Issue type and projectId.'
    })
  }
  Issue.create(issue)
    .then((createdIssue) => {
      res.send({
        success: true,
        issue: createdIssue,
        message: "Successfully created an Issue.",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        isError: true,
        error,
        message: "Error occurred while creating existing issue.",
      });
    });
};

exports.updateIssue = (req, res) => {
  const id = req.body.issueId;
  const projectId = req.body.projectId
  
  const issue = {
    type: req.body.type,
    name: req.body.name,
    description: req.body.description,
  };
  Issue.findOneAndUpdate({ _id: id }, issue, { new: true })
    .then((updatedIssue) => {
      res.send({
        success: true,
        issue: updatedIssue,
        message: "Successfully updated the Issue.",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        isError: true,
        error,
        message: "Error occurred while updating existing issue.",
      });
    });
};

exports.deleteIssue = (req, res) => {
  const issueId = req.body.issueId

  Issue.findOneAndDelete({ _id: issueId })
    .then((deletedItem) => {
      if (deletedItem) {
        if (deletedItem.isPartOfSprint) {
          Sprint.findOne({ projectId: deleteIssue.projectId })
          .then(sprintItem => {
            let sprint = sprintItem
            sprintItem.issues.map((issue, index) => {
              if (issue._id.toString() === issueId) {
                sprint.issues.splice(index, 1)
              }
            })
            Sprint.findOneAndUpdate({ projectId: deleteIssue.projectId }, sprint)
            .then(updatedItem => {
              
            })
          })
        }
        res.send({
          success: true,
          isError: false,
          message: "Issue successfully got deleted.",
        });
      }
    })
    .catch((error) => {
      res.send({
        success: false,
        isError: true,
        error,
        message: "Error occurred while deleting Issue.",
      });
    });
};

exports.getIssues = (req, res) => {
  const projectId = req.body.projectId

  Issue.find({ projectId })
    .then((issues) => {
      res.send({
        success: true,
        isError: false,
        issues,
        message: "Successfully fetched Issues.",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        isError: true,
        error,
        message: "Error occurred in fetching Issues.",
      });
    });
};
