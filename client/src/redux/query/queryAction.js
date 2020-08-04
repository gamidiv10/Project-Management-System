import axios from 'axios'
import {
    QUERY_FETCH_REQUEST,
    QUERY_FETCH_FAILURE,
    QUERY_FETCH_SUCCESS
} from './queryType'

const fetchQueryRequest = () => {
    return {
        type: QUERY_FETCH_REQUEST
    }
}

const fetchQuerySuccess = message => {
    return {
        type: QUERY_FETCH_SUCCESS,
        payload: message
    }
}

const fetchQueryFailure = message => {
    return {
        type: QUERY_FETCH_FAILURE,
        payload: message
    }
}

export const fetchQuery = query => dispatch => {
    dispatch(fetchQueryRequest())
    axios.post('/query/createQuery', query)
    .then(response => {
        if (response.data.success) {
            dispatch(fetchQuerySuccess(response.data.message))
        } else {
            dispatch(fetchQueryFailure(response.data.message))
        }
    })
    .catch(err => {
        dispatch(fetchQueryFailure(err))
    })
}