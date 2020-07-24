import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { buyIceCream } from "../../redux/"

const MultipleIceCream = () => {
    const num_of_iceCreams = useSelector(state => state.iceCream.numOfIceCreams)
    const dispatch = useDispatch()
    const [number, setNumber]  = useState(1)

    return (
        <div>
            <h3>Buy Multiple Ice Cream</h3>
            
            <h2>Number of Ice Creams - {num_of_iceCreams}</h2>
            <input 
                type="number" 
                placeholder="Enter number of ice-creams to buy" 
                onChange={e => setNumber(e.target.value)}
            />
            <button 
                onClick={() => dispatch(buyIceCream(number))}>
                Buy {number} Ice Cream/s
            </button>
        </div>
    )
}

export default MultipleIceCream