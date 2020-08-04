import {
    SPRINT_FETCH_REQUEST,
    SPRINT_FETCH_FAILURE,
    FETCH_SPRINT_LIST_SUCCESS,
    UPDATE_SPRINT_FOR_TASK_SUCCESS,
    DELETE_SPRINT_SUCCESS,
    CREATE_SPRINT_SUCCESS,
    UPDATE_SPRINT_SUCCESS
} from './sprintType.js'

const initialSprintState = {
    loading: false,
    sprints: [],
    error: '',
    success: false,
    message: ''
}


const sprintReducer = (state = initialSprintState, action) => {
    let bluePrintSuccessObj = {
        ...state,
        loading: false,
        success: true,
        error: '',
        sprints: [],
        message: ''
    }
    let listOfSprints = []
    switch(action.type) {
        case SPRINT_FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
        case SPRINT_FETCH_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.payload.error,
                message: action.payload.message
            }
        case FETCH_SPRINT_LIST_SUCCESS:
            bluePrintSuccessObj.sprints = action.payload.sprints
            bluePrintSuccessObj.message = action.payload.message
            return bluePrintSuccessObj

        case CREATE_SPRINT_SUCCESS:
            listOfSprints = [ ...state.sprints ]
            const sprint = action.payload.sprint
            sprint.tasks = []
            listOfSprints.push(sprint)
            bluePrintSuccessObj.sprints = listOfSprints
            bluePrintSuccessObj.message = action.payload.message
            return bluePrintSuccessObj    

        case UPDATE_SPRINT_FOR_TASK_SUCCESS:
            listOfSprints = [ ...state.sprints ]
            state.sprints.map((sprint, spInd) => {
                if (sprint.sprintNumber === action.helper.sprintNumber) {
                    let tasks = sprint.tasks
                    if(tasks.length !== 0) {
                        sprint.tasks.map((task, taskInd) => {
                            if (task._id === action.payload.task._id) {
                                if (action.payload.updateSprintTo === 0) {
                                    tasks.splice(taskInd, 1)
                                } else {
                                    tasks[taskInd] = action.payload.task
                                }
                            }
                            return null
                        })
                    }
                    listOfSprints[spInd] = tasks
                }
                return null
            })
            bluePrintSuccessObj.sprints = listOfSprints
            bluePrintSuccessObj.message = action.payload.message
            return bluePrintSuccessObj

        case DELETE_SPRINT_SUCCESS:
            listOfSprints = [ ...state.sprints ]
            state.sprints.map((sprint, ind) => {
                if (sprint._id === action.helper.sprintId) {
                        listOfSprints.splice(ind, 1)
                    }
                return null
            })
            bluePrintSuccessObj.sprints = listOfSprints
            bluePrintSuccessObj.message = action.payload.message
            return bluePrintSuccessObj

        

        case UPDATE_SPRINT_SUCCESS:
            listOfSprints = [ ...state.sprints ]
            const updatedSprint = action.payload.sprint
            
            state.sprints.map((sprint, index) => {
                if (
                        updatedSprint._id === sprint._id && 
                        updatedSprint.sprintNumber === sprint.sprintNumber
                    ) {
                        listOfSprints[index] = updatedSprint
                    }
                    return null
            })
            bluePrintSuccessObj.sprints = listOfSprints
            bluePrintSuccessObj.message = action.payload.message
            return bluePrintSuccessObj

        default:
            return state
    }
    
}

export default sprintReducer