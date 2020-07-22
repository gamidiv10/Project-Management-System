const People = require("../models/People");

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


exports.inviteUser = (req, res) => {
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
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

    try{
    transporter.sendMail(mailOptions);
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: "Server Error",
          });
    }
    console.log(req.body);

    return res.status(201).json({
      success: true,
      data: "Invitation Sent",
    });
};