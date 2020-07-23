import { combineReducers } from "redux"
import cakeReducer from "./cake/cakeReducer"
import iceCreamReducer from "./ice-cream/iceCreamReducer"
import userReducer from "./users/userReducer"

/* 
    This is where all reducers combine into one object of root reducer

    Remember here rootReducer should be object and not a function
    So not like this rootReducer = () => combineReducers({}),
    same is with store.
*/
const rootReducer = combineReducers(
    {
        cake: cakeReducer,
        iceCream: iceCreamReducer,
        users: userReducer
    }
)

export default rootReducer