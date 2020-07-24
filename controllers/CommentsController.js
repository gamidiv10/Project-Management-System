/* Author - Satya Kumar Itekela */
const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  try {
    console.log("comment", req.body);
    const comment = await Comment.create(req.body);
    return res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      console.log(messages);
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
