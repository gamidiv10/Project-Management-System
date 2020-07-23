import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { buyCake } from '../../redux'

function HookCakeContainer() {
    const numOfCakes = useSelector(state => state.cake.numOfCakes)
    const dispatch = useDispatch()

    return (
        <div>
            <h2>Cake Container using Redux hooks </h2> 
            <h2>Number of cakes - {numOfCakes}</h2>
            <button onClick={() => dispatch(buyCake())}>Buy Cake</button>
        </div>
    )
}

export default HookCakeContainer
