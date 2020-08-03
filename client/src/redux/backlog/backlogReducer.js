import {
    BACKLOG_FETCH_REQUEST,
    BACKLOG_FETCH_FAILURE,
    BACKLOG_FETCH_SUCCESS
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
                loading: true
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
            let tasks = action.payload
            action.payload.map((task, index) => {
                if (task.sprintNumber != 0) {
                    tasks.splice(index, 1)
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
            let tasks = state.tasks
            action.payload.map((task, index) => {
                if (tasks[index].id === task.id) {
                    tasks[index] = task
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