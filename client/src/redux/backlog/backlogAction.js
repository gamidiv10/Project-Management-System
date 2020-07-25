import axios from 'axios'
import {
    BACKLOG_FETCH_REQUEST,
    BACKLOG_FETCH_FAILURE,
    BACKLOG_FETCH_SUCCESS
} from "./backlogTypes"

const fetchBacklogRequest = () => ({
    type: BACKLOG_FETCH_REQUEST,
})

const fetchBacklogFailure = (error, message) => ({
    type: BACKLOG_FETCH_FAILURE,
    payload: error,
    message: message
})

const fetchBacklogSuccess = (issues, message) => ({
    type: BACKLOG_FETCH_SUCCESS,
    payload: issues,
    message: message
})

export const fetchBacklogIssues = (issueId = "") => (dispatch, getState) => {
    dispatch(fetchBacklogRequest())
    axios.post('/backlog/getIssues', {
        issueId
    }).then(res => {
        if(res.success) {
            dispatch(fetchBacklogSuccess(
                res.issues,
                res.message
            ))
        } else {
            dispatch(fetchBacklogFailure(
                res.error,
                res.message
            ))
        }
    }).catch(error => {
        dispatch(fetchBacklogFailure(
            error,
            'Failed to fetch the backlog issue request.'
        ))
    })
}

export const addBacklogIssue = (issue) => (dispatch, getState) => {
    let issues = getState().backlog.issues
    dispatch(fetchBacklogRequest())
    axios.post('/backlog/createIssue', issue)
    .then(res => {
        if(res.success) {
            issues = issues.push(res.issue)
            dispatch(fetchBacklogSuccess(
                issues,
                res.message
            ))
        } else {
            const error = res.isError ? res.error : ''
            dispatch(fetchBacklogFailure(
                error,
                res.message
            ))
        }
    }).catch(error => {
        dispatch(fetchBacklogFailure(
            error,
            'Failed to add issue to the backlog.'
        ))
    })
}

export const updateBacklogIssue = (issueId, type, name, description = "", index) => (dispatch, getState) => {
    let backlogIssues = getState().backlog.issues
    dispatch(fetchBacklogRequest())
    axios.put('/backlog/updateIssue', {
        issueId,
        type,
        name,
        description
    }).then(res => {
        if(res.success) {
            backlogIssues[index] = res.issue
            dispatch(fetchBacklogSuccess(
                backlogIssues,
                res.message
            ))
        } else {
            dispatch(fetchBacklogFailure(
                res.error,
                res.message
            ))
        }
    }).catch(error => {
        dispatch(fetchBacklogFailure(
            error,
            'Failed to update the Issue.'
        ))
    })
}

export const deleteBacklogIssue = (issueId) => (dispatch, getState) => {
    let issues = getState().backlog.issues
    dispatch(fetchBacklogRequest())
    axios.post('/backlog/deleteIssue', { issueId })
    .then(res => {
        if(res.success) {
            getState().backlog.issues.map((issue, index) => {
                if (issue._id === issueId) {
                    issues.splice(index, 1)
                }
            })
            dispatch(fetchBacklogSuccess(
                issues,
                res.message
            ))
        } else {
            const error = res.isError ? res.error : ''
            dispatch(fetchBacklogFailure(
                error,
                res.message
            ))
        }
    }).catch(error => {
        dispatch(fetchBacklogFailure(
            error,
            'Failed to delete issue from the backlog.'
        ))
    })
}