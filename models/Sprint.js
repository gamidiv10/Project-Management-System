import { Schema, Model} from 'mongoose'

const SprintSchema = new Schema({
    sprint_number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    issues: [{type: Schema.Types.ObjectId}]
})

export default Model('Sprint', SprintSchema)