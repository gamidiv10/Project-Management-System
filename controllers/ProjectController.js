/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
const Project = require("../models/Project");
const People = require("../models/People");

//Create Project Post Request
exports.createProject = (req, res, next) => {
  try {
    var project = {};
    Project.create(req.body, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        project = doc;
      }
    });
    People.create(
      {
        name: req.body.projectLead,
        role: "Team Lead",
        projectName: req.body.projectName,
        projectKey: req.body.projectKey,
        projectType: req.body.projectType,
        projectLead: req.body.projectLead,
      },
      function (err, doc) {
        if (err) {
          console.log(err);
        }
      }
    );

    return res.status(201).json({
      success: true,
      data: project,
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

//Edit Project Post Request
exports.editProject = async (req, res, next) => {
  try {
    const project = await Project.updateOne(
      { projectKey: req.body.projectKey },
      {
        $set: {
          projectName: req.body.projectName,
          projectType: req.body.projectType,
        },
      }
    );
    People.updateMany(
      { projectKey: req.body.projectKey },
      {
        $set: {
          projectName: req.body.projectName,
          projectType: req.body.projectType,
        },
      },
      function (err, doc) {
        if (err) {
          console.log(err);
        }
      }
    );
    return res.status(201).json({
      success: true,
      data: project,
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

//Load all Projects Get Request
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await People.find(
      { name: req.params.userName },
      "projectName projectKey projectType projectLead"
    );
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error ${error}`,
    });
  }
};
