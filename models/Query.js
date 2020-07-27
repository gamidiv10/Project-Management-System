const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({ 
    fullName: {
        type: String
    },
    email: {
        type: String,
        required : true,
    },
    subject: {
        type: String,
        required : true,
    },
    description: {
        type: String,
        required : true,
    },
})

module.exports = mongoose.model("Query", QuerySchema);