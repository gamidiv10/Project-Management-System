import React from 'react'
import { connect } from 'react-redux'
import { buyCake } from '../../redux'

function CakeContainer( props ) {
    return (
        <div>
            <h2>Cake Container using connect</h2> 
            <h2>Number of cakes - {props.numOfCakes}</h2>
            <button onClick={props.buyCake}>Buy Cake</button>
        </div>
    )
}

/* 
    This function, gets a specific item from the state and provide that as prop
    If application is large than this function needs to be moved to a separate file 
    called as selector, which selects specific Object from the state 
*/
const mapStateToProps = (state) => {
    return {
        numOfCakes: state.cake.numOfCakes
    }
}

/*  This method maps action creator to our component by providing it as prop.
    Role of this method is it dispatches the action from our redux store, 
    by providing a callback function to our component as a prop 
*/
const mapDispatchToProps = (dispatch) => {
    return {
        buyCake: () => dispatch(buyCake())
    }
}

// What this connect function does is we have 
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(CakeContainer)
