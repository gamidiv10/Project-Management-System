/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
const People = require("../models/People");

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

exports.getPeople = async (req, res, next) => {
  try {
    const people = await People.find();
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

exports.inviteUser = (req, res) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "taskaticapp@gmail.com",
      pass: "taskatic@12",
    },
  });

  var mailOptions = {
    from: "taskaticapp@gmail.com",
    to: "vamsi.gamidi01@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
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
