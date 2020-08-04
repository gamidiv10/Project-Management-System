/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

const moment = require('moment')
const { keys } = require("lodash");
const Task = require("../models/Task");
const People = require("../models/People");
const Notification = require("../models/Notification");

// add task post request
exports.addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    const { summary, projectName, assignee } = task
    // generating notification data for task creation
    const notificationData = {
      projectName,
      taskName: summary,
      type: 'TASK_CREATE',
      user: req.body.user,
      updates: JSON.stringify({ newValue: assignee })
    }

    // fetching all the people assigned to the project
    let people = await People.find({ projectName })
    people = people.map(({ name }) => name)

    console.log('people', people)

    // generating a notification for all the people assigned to the project respectively
    people.forEach(name => {
      if (name !== req.body.user) {
        notificationData['for'] = name
        Notification.create(notificationData)
      }
    })

    return res.status(201).json({
      success: true,
      data: task,
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

// edit task put request
exports.editTask = async (req, res, next) => {
  try {
    console.log("request", req.body);

    const oldTask = await Task.findOne({ id: req.body.id })

    const task = await Task.updateOne(
      { id: req.body.id },
      {
        $set: {
          projectName: req.body.projectName,
          issueType: req.body.issueType,
          summary: req.body.summary,
          description: req.body.description,
          priority: req.body.priority,
          assignee: req.body.assignee,
          dueDate: req.body.dueDate,
          storyPoints: req.body.storyPoints,
        },
      }
    );

    console.log('task', task)

    // fetching all the people assigned to the project
    let people = await People.find({ projectName: req.body.projectName })
    people = people.map(({ name }) => name)

    console.log('people', people)

    // list of fields which were updated
    const updateFields = []

    // generic notification details
    const notificationData = {
      projectName: req.body.projectName,
      taskName: req.body.summary,
      user: req.body.user
    }

    // adding each field to the list if it was altered
    if (req.body.projectName !== oldTask.projectName) {
      updateFields.push('projectName')
    }

    if (req.body.issueType !== oldTask.issueType) {
      updateFields.push('issueType')
    }

    if (req.body.summary !== oldTask.summary) {
      updateFields.push('summary')
    }

    // if (req.body.description !== oldTask.description) {
    //   updateFields.push('description')
    // }

    if (req.body.priority !== oldTask.priority) {
      updateFields.push('priority')
    }

    // generating a notification for all the people assigned to the project respectively
    people.forEach(name => {
      if (name !== req.body.user) {
        notificationData['for'] = name
        // generating a notification for each updated field
        updateFields.forEach((field) => {
          notificationData['type'] = 'TASK_UPDATE'
          notificationData['updates'] = JSON.stringify({ newValue: req.body[field], oldValue: oldTask[field], field })
          console.log(field, notificationData)
          Notification.create(notificationData)
        })

        // seperate notification for task assignee changes
        if (req.body.assignee !== oldTask.assignee) {
          notificationData['type'] = 'TASK_ASSIGN'
          notificationData['updates'] = JSON.stringify({ newValue: req.body.assignee, oldValue: oldTask.assignee })
          console.log('assignee', notificationData)
          Notification.create(notificationData)
        }

        // seperate notification for task due date changes
        if (!moment(req.body.dueDate).isSame(oldTask.dueDate)) {
          notificationData['type'] = 'DUE_DATE_UPDATE'
          notificationData['updates'] = JSON.stringify({ newValue: req.body.dueDate, oldValue: oldTask.dueDate })
          console.log('dueDate', notificationData)
          Notification.create(notificationData)
        }
      }
    })

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

// get tasks get request
exports.getTasks = async (req, res) => {
  var projectName = req.params.projectName;
  var sprintNo = req.params.sprintNumber;
  try {
    const tasks = await Task.find({
      projectName: projectName,
      sprintNumber: sprintNo,
    });
    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error ${error}`,
    });
  }
};

// get tasks by status get request
exports.getTaskByStatus = (req, res) => {
  var projectName = req.params.projectName;
  var status = req.params.status;
  var sprintNo = req.params.sprintNumber;
  Task.find({
    projectName: projectName,
    taskStatus: status,
    sprintNumber: sprintNo,
  })
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

// change tasks by status post request
exports.changeTaskByStatus = async (req, res) => {
  const { params: { id, status, user } } = req

  try {

    // fetching the task to be updated for generating notificaiton
    const task = await Task.findOne({ id }).exec()

    const data = await Task.updateOne({ id: id }, { $set: { taskStatus: status } }).exec()

    // generating notification data based on the task
    const notificationData = {
      projectName: task.projectName,
      taskName: task.summary,
      user: user,
      type: 'STATUS_UPDATE',
      updates: JSON.stringify({ oldValue: task.taskStatus, newValue: status })
    }

    // fetching all the people assigned to the project
    let people = await People.find({ projectName: task.projectName })
    people = people.map(({ name }) => name)

    console.log('people', people)

    // generating a notification for all the people assigned to the project respectively
    people.forEach(name => {
      if (name !== user) {
        notificationData['for'] = name
        Notification.create(notificationData)
      }
    })

    return res.status(200).json(data);
  } catch (error) {

    console.log(error);
    return res.status(500).json({ error });
  }
};

// update tasks by status post request
exports.updateTaskStatus = (req, res) => {
  var id = req.params.id;
  var sprintNumber = req.params.sprintNumber;

  Task.updateOne({ id: id }, { $set: { sprintNumber: sprintNumber } })
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

exports.getCalendarViewTasks = async (req, res) => {
  const { query: reqQuery } = req;
  let query = {};

  keys(reqQuery).forEach((key) => {
    const value = reqQuery[key];
    if (value && value !== "") {
      query[key] = value;
    }
  });

  try {
    const tasks = await Task.find(query);
    return res.status(200).json({ total: tasks.length, data: tasks });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};


exports.getTasksPost = async (req, res) => {
  var projectName = req.body.projectName;
  var sprintNo = req.body.sprintNumber;
  console.log('__getTaskPost', projectName, sprintNo);
  try {
    const tasks = await Task.find({
      projectName: projectName,
      sprintNumber: sprintNo,
    });
    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error ${error}`,
    });
  }
};