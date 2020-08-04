/**
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  const { query: { user } } = req

  try {
    // query to get all notifications, apart from the ones the user created
    const notifications = await Notification.find({ user: { $ne: user } }).sort([['createdAt', -1]]).exec()
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