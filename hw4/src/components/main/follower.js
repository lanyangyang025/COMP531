import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addFollower, delFollower } from './followingActions'

//content of a follower
export const Follower = ({name, avatar, headline }) => (
    <div className="users-container" name="follower">
        <div className="user-container">
	        <div className="well">
	            <img src={ avatar } className="img_friend" height="80" width="80" alt="Avatar"/>
	            <h3>{name}</h3>
	            <p>{headline}</p>
	            <button className="alert-button" onClick={()=>{document.getElementById(name).innerHTML=''}}>Unfollow</button>
	        </div>
	    </div>
    </div>
)

export default connect()(Follower)