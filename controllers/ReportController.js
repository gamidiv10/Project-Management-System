/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
const Report = require("../models/Report");

//Load Report Data Get Request
exports.getReportData = async (req, res, next) => {
  try {
    const reportData = await Report.find({
      projectName: req.params.projectName,
    });
    return res.status(201).json({
      success: true,
      data: reportData,
    });
  } catch (error) {
    console.log("error:", error.message);
    return res.status(500).json({
      sucess: false,
      error: "Server Error",
    });
  }
};
