import User from "./userType"
import axios from "axios"

// Here were all our action creators will be defined

/*  First 3 action creators returns only action, while last one
    makes use of thunk middleware hence it allows us to return function 
    and to dispatch action asynchronously
*/

export const fetchUserRequest = () => ({
    type: User.FETCH_USER_REQUEST,
})

export const fetchUserFailure = error => ({
    type: User.FETCH_USER_ERROR,
    payload: error
})

export const fetchUserSuccess = users => ({
    type: User.FETCH_USER_SUCCESS,
    payload: users
})

export const fetchUser = () => {
    return (dispatch, getState) => {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            const users = res.data.map(user => user.name)
            dispatch(fetchUserSuccess(users))
        })
        .catch(err => {
            dispatch(fetchUserFailure(err))
        })
    }
}