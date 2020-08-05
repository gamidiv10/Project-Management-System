import { createStore } from "redux"
import { applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'
// import { logger } from "redux-logger"
import rootReducer  from "./rootReducer"


/* Remember here store should be object and not a function
    So not like this store = () => createStore({}),
    same is with store.

    logger - Logger is for printing logs, of every activity
    thunk - Thunk allows us to modify the behaviour on how we call actions
            Especially, thunk allows us to call actions async
    redux-devtools - This is used to monitor our global state, 
*/

const configureStore = () => {
    if (process.env.NODE_ENV === "production") {
        return createStore(
            rootReducer, 
            applyMiddleware(thunk)
        )
    } else {
        return createStore(
            rootReducer, 
            composeWithDevTools(
                applyMiddleware(
                    // logger,
                    thunk
                )
            )
        )
    }
}

export default configureStore

