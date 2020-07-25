const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UserModel = require("../models/User");

exports.addUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
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

exports.modifyUser = async (req, res) => {
  try {
    console.log("request", req.body);
    const task = await UserModel.updateOne(
      { id: req.body.id },
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          jobTitle: req.body.jobTitle,
          department: req.body.department,
          organisation: req.body.organisation,
          country: req.body.country,
        },
      }
    );
    return res.status(201).json({
      success: true,
      data: task,
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
