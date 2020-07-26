import { Schema, model} from 'mongoose'
import Issue from './Issue'

const SprintSchema = new Schema({
    sprint_number: {
        type: Number,
        required: true,
        default: 0
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
    issues: {
        type: [ Issue.Schema ],
        default: []
    },
    isActive: {
        type: Boolean,
        default: false
    }
})

export default model('Sprint', SprintSchema)