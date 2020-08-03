const mongoose = require("mongoose");
const CounterModel = require('./Counter')

const sprintSchema =  new mongoose.Schema({
  sprintNumber: {
    type: Number,
    required: true,
    default: 0
  },
  projectName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isSprintComplete: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

sprintSchema.pre('save', async function() {
  // Don't increment if this is NOT a newly created document
  if(!this.isNew) return;

  const sprintNumber = await CounterModel.increment('sprintNumber');
  this.sprintNumber = sprintNumber;
});

module.exports = mongoose.model('Sprint', sprintSchema)