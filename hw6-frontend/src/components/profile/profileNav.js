import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { initialVisit } from '../auth/authActions'
import {logout} from '../auth/authActions'


//content of navigating different pages
const ProfileNav = ({ initialVisit, logout, username }) => {

return(

    <nav className="navbar navbar-inverse">
        <div className="container">
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-left">
                    <li className="text-capitalize navbar-brand h1" onClick = {initialVisit}>Main Page</li>
                    <li className="text-capitalize  h3 navbar-brand" onClick = {logout}>Log out</li>
                </ul>
            </div>
        </div>
    </nav>
)

}

export default connect(
    (state) => {
        return{
            username: state.profileReducer.username || ''
        }       
    },(dispatch) =>
    {
        return {
            initialVisit: () => {dispatch(initialVisit())},
            logout: () => {dispatch(logout())}
        }
    }
)(ProfileNav)