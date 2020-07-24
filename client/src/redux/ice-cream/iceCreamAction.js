import { BUY_ICE_CREAM } from "./iceCreamType"

export const buyIceCream = number => (
    {
        type: BUY_ICE_CREAM,
        payload: number
    }
)