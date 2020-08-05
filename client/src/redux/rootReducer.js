import { combineReducers } from "redux"
import cakeReducer from "./cake/cakeReducer"
import iceCreamReducer from "./ice-cream/iceCreamReducer"
import userReducer from "./users/userReducer"
import backlogReducer from './backlog/backlogReducer'
import queryReducer from "./query/queryReducer"
import sprintReducer from './sprints/sprintReducer'
/* 
    This is where all reducers combine into one object of root reducer

    Remember here rootReducer should be object and not a function
    So not like this rootReducer = () => combineReducers({}),
    same is with store.

    Give relevant name for each of your reducer
*/
const rootReducer = combineReducers(
    {
        cake: cakeReducer,
        iceCream: iceCreamReducer,
        users: userReducer,
        backlog: backlogReducer,
        sprint: sprintReducer,
        query: queryReducer,
    }
)

export default rootReducer