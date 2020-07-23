import { BUY_ICE_CREAM } from "./iceCreamType"

const initialIceCreamState = {
    numOfIceCreams : 20
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICE_CREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - action.payload
            }
        default: return state
    }
}

export default iceCreamReducer