const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required: [true, "Project Name is required"],
        unique: [true, "Project Name must be unique"]
    },
    projectKey:{
        type: String,
        required: [true, "Project Key is required"],
        unique: [true, "Project Key must be unique"]
    },
    projectType:{
        type: String,
        required: [true, "Project Type is required"],
    },
    projectLead:{
        type: String,
        required: [true, "Project Lead is required"],
    }
})

module.exports = mongoose.model('Project', ProjectSchema);