import { Schema, model} from 'mongoose'

const IssueSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    isOpen: {
        type: Boolean,
        required: true,
        default: true
    },
    isPartOfSprint: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default model('Issue', IssueSchema)