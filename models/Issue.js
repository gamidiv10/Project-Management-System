import { Schema, Model} from 'mongoose'

const IssueSchema = new Schema({
    issue_id: {
        type: Schema.Types.ObjectId
    },
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
})

export default Model('Issue', IssueSchema)