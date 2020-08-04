import {
    QUERY_FETCH_REQUEST,
    QUERY_FETCH_FAILURE,
    QUERY_FETCH_SUCCESS
} from './queryType'

const initialQuery = {
    isLoading: false,
    isIdle: true,
    isError: false,
    message: ''
}

const queryReducer = (state = initialQuery, action) => {
    switch(action.type) {
        case QUERY_FETCH_REQUEST:
            return  {
                ...state,
                isLoading: true,
            }
        case QUERY_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isIdle: false,
                message: action.payload
            }
        case QUERY_FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isIdle: false,
                message: action.payload
            }
        default:
            return state
    }
}

export default queryReducer