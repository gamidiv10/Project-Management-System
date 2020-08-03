import axios from 'axios'

import {
    fetchBacklogRequest,
    fetchBacklogFailure,
    fetchBacklogSuccess
} from '../backlog/backlogActions'


import {
    SPRINT_FETCH_REQUEST,
    SPRINT_FETCH_FAILURE,
    SPRINT_LIST_SUCCESS,
    DELETE_SPRINT_SUCCESS,
    CREATE_SPRINT_SUCCESS
} from './sprintType'

import { UPDATE_TASK_FOR_SPRINT_SUCCESS } from '../backlog/backlogTypes'


const fetchSprintRequest = () => ({
    type: SPRINT_FETCH_REQUEST
})

const fetchSprintFailure = payload => ({
    type: SPRINT_FETCH_FAILURE,
    payload
})

const fetchSprintSuccess = (action, payload, extraParam) => ({
    type: action,
    payload,
    extraParam
})

export const createSprint = (name, goal, projectName, description = "") => dispatch => {
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/createSprint',
        {
            param : {
                name,
                goal,
                projectName,
                description
            }
        }
    ).then(res => {
        if (res.data.success) {
            fetchSprintSuccess(
                CREATE_SPRINT_SUCCESS,
                res.data
            )
        } else {
            dispatch(fetchSprintFailure(res.data))
        }
    }).catch(err => {
        dispatch(
            fetchSprintFailure({
                isError: true,
                error: err,
                message: 'Axios error in creating sprint.'
            })
        )
    })
}

export const updateSprint = (sprintId, name, goal, projectName, description = "") => dispatch => {
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/updateSprint',
        {
            param : {
                sprintId,
                name,
                goal,
                projectName,
                description
            }
        }
    ).then(res => {
        if (res.data.success) {
            fetchSprintSuccess(
                UPDATE_SPRINT_SUCCESS,
                res.data
            )
        } else {
            dispatch(fetchSprintFailure(res.data))
        }
    }).catch(err => {
        dispatch(
            fetchSprintFailure({
                isError: true,
                error: err,
                message: 'Axios error in updating sprint.'
            })
        )
    })
}

export const deleteSprint = (sprintId, projectName) => dispatch => {
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/deleteSprint',
        {
            param : {
                sprintId,
                projectName
            }
        }
    ).then(res => {
        if (res.data.success) {
            fetchSprintSuccess(
                DELETE_SPRINT_SUCCESS,
                res.data
            )
        } else {
            dispatch(fetchSprintFailure(res.data))
        }
    }).catch(err => {
        dispatch(
            fetchSprintFailure({
                isError: true,
                error: err,
                message: 'Axios error in updating sprint.'
            })
        )
    })
}
export const fetchSprintList = projectName => dispatch => {
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/getSprints',
        {
            params : {
                projectName
            }
        }
    ).then(res => {
        if (res.data.success) {
            dispatch(
                fetchSprintSuccess(
                    SPRINT_LIST_SUCCESS,
                    res.data
                )
            )
        } else {
            dispatch(fetchSprintFailure(res.data))
        }
    })
    .catch(err => {
        dispatch(
            fetchSprintFailure(
                {
                    success: false,
                    isError: true,
                    error: err,
                    message: "Error occurred in making sprint request.",
                }
            )
        )
    })
}

export const updateTaskToSprint = (sprint, task, updateSprintTo) => {
    dispatch(fetchBacklogRequest())
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/taskToSprintUpdate',
        {
            params: {
                sprintNumber: sprint.sprintNumber,
                taskId: task.taskId,
                sprintId: sprint.sprintId,
                updateSprintTo
            }
        }
    ).then(res => {
        if (res.data.success) {
            dispatch(
                fetchBacklogSuccess(
                    UPDATE_TASK_FOR_SPRINT_SUCCESS,
                    res.data
                )
            )
            dispatch(
                fetchSprintSuccess(
                    UPDATE_SPRINT_FOR_TASK_SUCCESS,
                    res.data
                )
            )
        } else {
            dispatch(fetchBacklogFailure(res.data))
            dispatch(fetchSprintFailure(res.data))
        }
    }).catch(err => {
        const axiosError = {
            isError: true,
            error: err,
            message: 'Axios error in updating task for issue.'
        }
        dispatch(fetchBacklogFailure(axiosError))
        dispatch(fetchSprintFailure(axiosError))
    })
}