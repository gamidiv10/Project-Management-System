/**
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

const Notification = require("../models/Notification");
const People = require("../models/People");

exports.getNotifications = async (req, res) => {
  const { query: { user } } = req

  try {
    // query to get all notifications, apart from the ones the user created or the ones not belonging to the projects the user is assigned to
    let projects = await People.find({ name: user }, "projectName")
    projects = projects.map(({ projectName }) => projectName)

    const query = { user: { $ne: user }, projectName: { $in: projects } }
    const notifications = await Notification.find(query).sort([['createdAt', -1]]).exec()
    return res.status(200).json({ data: notifications })

  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ error })
  }
};

exports.markAsRead = async (req, res) => {
  const { params: { id } } = req

  try {
    // query mark said notification as read
    await Notification.updateOne({ _id: id }, { $set: { read: true } }).exec()
    return res.status(200).json({ message: 'Success' })

  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ error })
  }
}