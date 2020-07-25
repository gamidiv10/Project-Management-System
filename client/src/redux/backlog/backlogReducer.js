import {
    BACKLOG_FETCH_REQUEST,
    BACKLOG_FETCH_FAILURE,
    BACKLOG_FETCH_SUCCESS
} from "./backlogTypes"

const initialBacklogState = {
    loading: false,
    issues: [],
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
                error: action.payload,
                message: action.message
            }
        case BACKLOG_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                issues: action.payload,
                success: true,
                error: '',
                message: action.message
            }
        default: return state
    }
}

export default backlogReducer