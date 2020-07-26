/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

const { keys } = require("lodash");
const People = require("../models/People");

//Add User Post Request
exports.addUser = async (req, res, next) => {
  try {
    const user = await People.create(req.body);
    return res.status(201).json({
      success: true,
      data: user,
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

//Load Users Get Request
exports.getPeople = async (req, res, next) => {
  const { query: reqQuery } = req;
  let query = {};

  keys(reqQuery).forEach((key) => {
    const value = reqQuery[key];
    if (value && value !== "") {
      query[key] = value;
    }
  });

  try {
    const people = await People.find(query);
    return res.status(200).json({
      success: true,
      count: people.length,
      data: people,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error ${error}`,
    });
  }
};

//Load Users by Project Get Request
exports.getPeopleByProject = async (req, res, next) => {
  try {
    var projectName = req.params.projectName;
    const people = await People.find({
      projectName: projectName,
    });
    return res.status(200).json({
      success: true,
      count: people.length,
      data: people,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error ${error}`,
    });
  }
};

//Invite User Post Request
exports.inviteUser = (req, res) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "taskaticapp1@gmail.com",
      pass: "taskatic@123",
    },
  });
  var mailOptions = {
    from: "taskaticapp@gmail.com",
    to: req.body.email,
    subject: "Taskatic Invitation",
    text:
      "You are invited to use Taskatic, Please go to this link and register: https://taskatic.herokuapp.com/",
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }

  return res.status(201).json({
    success: true,
    data: "Invitation Sent",
  });
};
