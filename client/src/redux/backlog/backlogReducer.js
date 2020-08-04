import {
    BACKLOG_FETCH_REQUEST,
    BACKLOG_FETCH_FAILURE,
    TASK_LIST_SUCCESS,
    UPDATE_TASK_FOR_SPRINT_SUCCESS
} from "./backlogTypes"

const initialBacklogState = {
    loading: false,
    tasks: [],
    error: '',
    success: false,
    message: ''
}

const backlogReducer = (state = initialBacklogState, action) => {
    switch(action.type) {
        case BACKLOG_FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
        case BACKLOG_FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload.error,
                message: action.payload.message
            }
        case TASK_LIST_SUCCESS:
            let tasks = []
            action.payload.map(task => {
                if (task.taskStatus != "Done") {
                    tasks.push(tasks)
                }
            })
            return {
                ...state,
                loading: false,
                tasks,
                success: true,
                error: '',
                message: 'Successfully fetched all tasks for given sprint number and project name.'
            }
        case UPDATE_TASK_FOR_SPRINT_SUCCESS:
            tasks = state.tasks
            state.tasks.map((task, index) => {
                if (task.id === action.payload.task.id) {
                    tasks[index] = action.payload.task
                }
            })
            return {
                ...state,
                loading: false,
                tasks,
                success: true,
                message: action.payload.message
            }
        default: return state
    }
}

export default backlogReducer