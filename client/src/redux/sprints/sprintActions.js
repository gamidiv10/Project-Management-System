import axios from 'axios'

import {
    fetchBacklogRequest,
    fetchBacklogFailure,
    fetchBacklogSuccess
} from '../backlog/backlogActions'


import {
    SPRINT_FETCH_REQUEST,
    SPRINT_FETCH_FAILURE,
    FETCH_SPRINT_LIST_SUCCESS,
    DELETE_SPRINT_SUCCESS,
    CREATE_SPRINT_SUCCESS,
    UPDATE_SPRINT_SUCCESS
} from './sprintType'

import { UPDATE_TASK_FOR_SPRINT_SUCCESS } from '../backlog/backlogTypes'


const fetchSprintRequest = () => ({
    type: SPRINT_FETCH_REQUEST
})

const fetchSprintFailure = payload => ({
    type: SPRINT_FETCH_FAILURE,
    payload
})

const fetchSprintSuccess = (action, payload, helper = {}) => ({
    type: action,
    payload,
    helper
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
    const paramObj = {
        sprintId,
        projectName
    }
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/deleteSprint',
        {
            param : paramObj
        }
    ).then(res => {
        if (res.data.success) {
            fetchSprintSuccess(
                DELETE_SPRINT_SUCCESS,
                res.data,
                paramObj,
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
    let sprints = []
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/getSprints',{
        params : {
            projectName
        }}
    ).then(res => {
        let sprint = {}
        let errTask = false
        if (res.data.success) {
            res.data.sprints.map(spr => {
                sprint = spr
                axios.post(
                    '/sprint/getTasksForSprint', {
                    params: {
                        sprintNumber: sprint.sprintNumber,
                        sprintId: sprint.sprintId
                    }}
                ).then(taskRes => {
                    if (taskRes.data.success) {
                        sprint.tasks = taskRes.data.tasks
                        sprints.push(sprint)
                    }
                }).catch(taskErr => {
                    errTask = taskErr
                    console.log('Error occurred while fetching task', taskErr);
                })
            })
            if (!errTask) {
                const payload = {
                    sprints,
                    message: 'Successfully fetched all the tasks.'
                }
                dispatch(
                fetchSprintSuccess(
                    FETCH_SPRINT_LIST_SUCCESS,
                    payload
                ))
            } else {
                dispatch(fetchSprintFailure({
                    isError: true,
                    error: errTask,
                    message: 'Error in fetching tasks for sprint.'
                }))
            }
        } else {
            dispatch(fetchSprintFailure(res.data))
        }
    })
    .catch(err => {
        dispatch(
            fetchSprintFailure(
                {
                    isError: true,
                    error: err,
                    message: "Error occurred in making sprint request.",
                }
            )
        )
    })
}

export const updateTaskToSprint = (sprint, taskId, updateSprintTo) => {
    const paramObj = {
        sprintNumber: sprint.sprintNumber,
        taskId,
        sprintId: sprint.sprintId,
        updateSprintTo
    }
    dispatch(fetchBacklogRequest())
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/taskToSprintUpdate',
        {
            params: paramObj
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
                    res.data,
                    paramObj
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