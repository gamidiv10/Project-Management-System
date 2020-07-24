import React from 'react'
import { connect } from 'react-redux'
import { buyIceCream } from '../../redux'

function IceCreamContainer( props ) {
    return (
        <div>
            <h2>Number of Ice Creams - {props.numOfIceCreams}</h2>
            <button onClick={props.buyIceCream}>Buy Ice Cream</button>
        </div>
    )
}

/* 
    This function, gets a specific item from the state and provide that as prop
    If application is large than this function needs to be moved to a separate file 
    called as selector, which selects specific Object from the state 
*/
const mapStateToProps = state => {
    return {
        numOfIceCreams: state.iceCream.numOfIceCreams
    }
}

/*  This method maps action creator to our component by providing it as prop.
    Role of this method is it dispatches the action from our redux store, 
    by providing a callback function to our component as a prop 
*/
const mapDispatchToProps = dispatch => {
    return {
        buyIceCream: () => dispatch(buyIceCream(1))
    }
}

// What this connect function does is we have 
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(IceCreamContainer)
