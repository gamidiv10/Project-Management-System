const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    role:{
        type: String,
        required: [true, "Role is required"],
    },
    projectKey:{
        type: String,
        required: [true, "Project Key is required"],
    }
})

module.exports = mongoose.model('People', PeopleSchema);