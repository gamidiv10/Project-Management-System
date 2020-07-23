import User from "./userType"

const initialUserState = {
    loading: false,
    users: [],
    error: ''
}

const userReducer = (state = initialUserState, action) => {
    switch(action.type) {
        case User.FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case User.FETCH_USER_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: ''
            }
        case User.FETCH_USER_ERROR:
            return {
                ...state,
                users: [],
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export default userReducer