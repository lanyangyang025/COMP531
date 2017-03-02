import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Action, goToIndex, goToProfile } from '../../actions'
import {logout} from '../auth/authActions'

const Nav = ({ goToProfile, logout, username }) => {

return(
    <nav className="navbar navbar-inverse">
        <div className="container">
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-left">
                    <li className="text-capitalize navbar-brand h1" onClick = {goToProfile}>Profile Page</li>
                    <li className="text-capitalize  h3 navbar-brand" onClick = {logout}>Log out</li>
                </ul>
            </div>
        </div>
    </nav>
	/*
    <div>
        <div id="main_nav">

            <li><a href="#" id="main_profile" onClick={goToProfile}>Edit Your Profile</a></li>

            <li><a href="#" id='main_logout' onClick={logout}>Log out {username}</a></li>
 
        </div>
    </div>
    */
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
			goToProfile : () => {dispatch(goToProfile())},
			logout: () => {dispatch(logout())}
		}
	}
)(Nav)