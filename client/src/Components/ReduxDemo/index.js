import React from 'react'
import CakeContainer from "./CakeContainer"
import IceCreamContainer from "./IceCreamContainer"
import HookCakeContainer from './HookCakeContainer'
import MultipleIceCream from "./MultipleIceCreamContainer"
import CommonItemContainer from "./CommonItemContainer"
import UsersContainer from './UsersContainer'

function ReduxDemo() {
    return (
        <div>
            <CakeContainer/>
            <hr />
            <HookCakeContainer />
            <hr />
            <IceCreamContainer />
            <hr />
            <MultipleIceCream />
            <hr />
            <CommonItemContainer cake/>
            <CommonItemContainer iceCream/>
            <hr/>
            <UsersContainer />
        </div>
    )
}

export default ReduxDemo
