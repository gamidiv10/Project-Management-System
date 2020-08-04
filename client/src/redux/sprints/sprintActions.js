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
    UPDATE_SPRINT_SUCCESS,
    UPDATE_SPRINT_FOR_TASK_SUCCESS,
    START_SPRINT_SUCCESS
} from './sprintType'

import { 
    UPDATE_TASK_FOR_SPRINT_SUCCESS 
} from '../backlog/backlogTypes'


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
            name,
            goal,
            projectName,
            description
        }
    ).then(res => {
        if (res.data.success) {
            // console.log('___Creating Sprint__', res.data);
            dispatch(fetchSprintSuccess(
                CREATE_SPRINT_SUCCESS,
                res.data
            ))
        } else {
            dispatch(fetchSprintFailure(res.data))
        }
    }).catch(err => {
        dispatch(
            fetchSprintFailure({
                isError: true,
                error: err,
                message: "Error occurred while creating sprint."
            })
        )
    })
}

export const updateSprint = (sprintId, name, goal, projectName, description = "") => dispatch => {
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/updateSprint',
        {
            sprintId,
            name,
            goal,
            projectName,
            description
        }
    ).then(res => {
        if (res.data.success) {
            dispatch(
                fetchSprintSuccess(
                    UPDATE_SPRINT_SUCCESS,
                    res.data
            ))
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
    // console.log('paramObj', paramObj);
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/deleteSprint',
        paramObj
    ).then(res => {
        if (res.data.success) {
            dispatch(fetchSprintSuccess(
                    DELETE_SPRINT_SUCCESS,
                    res.data,
                    paramObj,
                )
            )
        } else {
            dispatch(fetchSprintFailure(res.data))
        }
    }).catch(err => {
        dispatch(
            fetchSprintFailure({
                isError: true,
                error: err,
                message: 'Some Error occurred updating sprint.'
            })
        )
    })
}
export const fetchSprintList = projectName => dispatch => {
    let sprintsArry = []
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/getSprints',
        {
            projectName
        }
    ).then(res => {
        
        let sprints = []
        let errTask = false
        if (res.data.success) {
            // console.log('__res.data', res.data);
            sprints = res.data.sprints
            if (sprints.length !== 0) {
                res.data.sprints.map((spr, index) => {
                    const sprint = spr
                    sprint.tasks = []
                    // console.log('__sprint', sprint);
                    axios.post(
                        '/sprint/getTasksForSprint',
                        {
                            sprintNumber: spr.sprintNumber,
                            sprintId: spr._id
                        }
                    ).then(taskRes => {
                        // console.log('_FEtched tas--', taskRes.data.tasks);
                        if (taskRes.data.success) {
                            sprint.tasks = taskRes.data.tasks
                        }
                        sprintsArry.push(sprint)
                        if (index === sprints.length - 1) {
                            const payload = {
                                sprints: sprintsArry,
                                message: 'Successfully fetched all the sprints and its respective tasks.'
                            }
                            dispatch(
                                fetchSprintSuccess(
                                    FETCH_SPRINT_LIST_SUCCESS,
                                    payload
                                ))
                        }
                    }).catch(taskErr => {
                        errTask = taskErr
                        // console.log('Error occurred while fetching task', taskErr);
                    })
                })
            }
                if (errTask) {
                    dispatch(
                    fetchSprintFailure({
                        isError: true,
                        error: errTask,
                        message: 'Error in fetching tasks for sprint.'
                    }))
                }
        } else {
            dispatch(fetchSprintFailure(res.data))
            return null
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

export const updateTaskToSprint = (taskId, sprintNumber, updateSprintTo) => dispatch => {
    const paramObj = {
        sprintNumber,
        taskId,
        updateSprintTo
    }
    // console.log('__PARAM__', paramObj);
    // dispatch(fetchBacklogRequest())
    // dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/taskToSprintUpdate',
        paramObj
    ).then(res => {
        if (res.data.success) {
            window.location.reload(true)
            // console.log('___res.data.success', res.data);
            // dispatch(fetchBacklogSuccess(
            //         UPDATE_TASK_FOR_SPRINT_SUCCESS,
            //         res.data
            //     )
            // )
            // dispatch(fetchSprintSuccess(
            //         UPDATE_SPRINT_FOR_TASK_SUCCESS,
            //         res.data,
            //         paramObj
            //     )
            // )
        }
    }).catch(err => {
        // console.log('__ERROR', err);
        const axiosError = {
            isError: true,
            error: err,
            message: 'Some Error occurred while updating task for issue.'
        }
        console.log('axiosError', axiosError);
        // dispatch(fetchBacklogFailure(axiosError))
        // dispatch(fetchSprintFailure(axiosError))
    })
}
export const startSprint = sprintNumber => dispatch => {
    dispatch(fetchSprintRequest())
    axios.post(
        '/sprint/startSprint',
        {
            sprintNumber
        }
    ).then(res => {
        // console.log('__Start Sprint__');
        if (res.data.success) {
            dispatch(fetchSprintSuccess(
                START_SPRINT_SUCCESS,
                res.data
            ))
        }
    }).catch(err => {
        const axiosError = {
            isError: true,
            error: err,
            message: 'Some Error occurred while Starting sprint.'
        }
        dispatch(fetchSprintFailure(axiosError))
    })
}