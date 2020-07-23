import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../../redux/'

function UsersContainer(props) {
    return (
        <div>
            <h2>Async Actions</h2>
            {
                !props.loading 
                && props.users.users.length > 0
                ? props.users.users.map((user, index) => <p key={index}>{user}</p>) 
                : <p>No Users available.</p>
            }
            <button onClick={props.fetchUsers}>Fetch users</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUser())
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(UsersContainer)
