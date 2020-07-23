/* 
    This component is used as a common component for CakeContainer and IceCream container
    It deducts the amount of cake and ice-creams from store, based on props received
*/

import React from 'react'
import { connect } from "react-redux"
import { buyCake, buyIceCream } from "../../redux"

function CommonItemContainer(props) {
    return (
        <div>
            <h2>Common Item Container</h2>
            <h3>Item Quantity - {props.numberOfItems}</h3>
            <button onClick={props.buyItem}>Buy Item</button>
        </div>
    )
}
/*
    Here we are implementing mapStateToProps based on props received 
    by component itself, if it is cake than state of cake will be selected
    else iceCream state.
*/
const mapSateToProps = (state, ownProps) => {
    const numberOfItems = ownProps.cake ? state.cake.numOfCakes : state.iceCream.numOfIceCreams
    return {
        numberOfItems
    }
}

/*
    Here we are implementing mapDispatchToProps based on props received 
    by component itself, if it is cake than buyCake action creator will be called
    else buyIceCream action creator will be called

    Here with buyIceCream we are passing 1 cuz we have made a change in action creator
    taking number of iceCreams we want to deduct from store
*/
const mapDispatchToProps = (dispatch, ownProps) => {
    const dispatchAction = ownProps.cake 
                            ? () => dispatch(buyCake())
                            : () => dispatch(buyIceCream(1))
    return {
        buyItem: dispatchAction
    }
}

export default connect(
    mapSateToProps,
    mapDispatchToProps
)(CommonItemContainer)
