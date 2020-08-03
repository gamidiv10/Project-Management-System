const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        default: 0,
    },
})

counterSchema.static('increment', async function(counterName) {
    const count = await this.findOneAndUpdate(
        counterName,
        {$inc: {seq: 1}},
        // new: return the new value
        // upsert: create document if it doesn't exist
        {new: true, upsert: true}
    );
    return count.seq;
});

module.exports = mongoose.model('Counter', counterSchema)