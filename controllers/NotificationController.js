/**
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  const { query: { user } } = req

  try {
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
    await Notification.updateOne({ _id: id }, { $set: { read: true } }).exec()
    return res.status(200).json({ message: 'Success' })
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ error })
  }
}