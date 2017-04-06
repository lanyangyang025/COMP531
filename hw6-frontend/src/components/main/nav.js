import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Action, goToIndex, goToProfile } from '../../actions'
import {logout} from '../auth/authActions'

//content of navigating different pages
const Nav = ({ goToProfile, logout, username }) => {

return(
    <nav className="navbar navbar-inverse">
        <div className="container">
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-left">
                    <li id='maintopro' className="text-capitalize navbar-brand h1" onClick = {goToProfile}>Profile Page</li>
                    <li id='maintoland' className="text-capitalize  h3 navbar-brand" onClick = {logout}>Log out</li>
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
			goToProfile : () => {dispatch(goToProfile())},
			logout: () => {dispatch(logout())}
		}
	}
)(Nav)