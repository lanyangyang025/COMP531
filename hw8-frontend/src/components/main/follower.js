import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addFollower, delFollower, dispatch } from './followingActions'

//content of a follower
export const Follower = ({name, avatar, headline,dispatch }) => (
    <div className="users-container" name="follower">
        <div className="user-container">
            <div className="well">
                <img src={ avatar } className="img_friend" height="80" width="80" alt="Avatar"/>
                <h3>{name}</h3>
                <p>{headline}</p>
                <input id="unfollow_btn" type="button" value="Unfollow" onClick={() => { dispatch(delFollower(name)) }}></input>
                <br/><br/>
            </div>
        </div>
    </div>
)

export default connect()(Follower)