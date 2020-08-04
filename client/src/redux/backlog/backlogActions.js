import axios from "axios"
// import { CancelToken  } from 'axios'
import {
    BACKLOG_FETCH_REQUEST,
    BACKLOG_FETCH_FAILURE,
    TASK_LIST_SUCCESS
} from "./backlogTypes"

// const source = CancelToken.source()

export const fetchBacklogRequest = () => ({
    type: BACKLOG_FETCH_REQUEST,
})

export const fetchBacklogFailure = payload => ({
    type: BACKLOG_FETCH_FAILURE,
    payload
})

export const fetchBacklogSuccess = (action, payload, helper = {}) => ({
    type: action,
    payload,
    helper
})


export const fetchTasks = (projectName, sprintNumber) => (dispatch, getState) => {
    const errorObj = {}
    dispatch(fetchBacklogRequest())
    axios.post('/task/getTasksPost', 
        {
            projectName,
            sprintNumber
        }
    ).then(res => {
        const data = res.data
        console.log('__data__', data);
        if(data.success) {
            dispatch(
                fetchBacklogSuccess(
                    TASK_LIST_SUCCESS,
                    data.data
                )
            )
        } else {
            errorObj.isError = true
            errorObj.error = res.data.error
            errorObj.message = 'Error in fetching list of the tasks.'
            dispatch(
                fetchBacklogFailure(errorObj)
            )
        }
    }).catch(error => {
        errorObj.isError = true
        errorObj.error = error
        errorObj.message = 'Axios error in fetching list of the tasks.'
        dispatch(fetchBacklogFailure(errorObj))
    })
}
