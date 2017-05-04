import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateHeadline } from './mainActions'

//content of the headline
export const Headline= ({username, headline, updateHeadline, avatar}) =>{

    let newheadline;

    return (
        <div className="well">
            <img src={avatar} id="user_img" height="80" width="80" alt="Avatar"/>
            <h3>{ username?username:localStorage.getItem("login_username")}</h3>
            <span id="old_headline">{ headline ? headline : "Busy in coding" }</span><br/>

            <div className="col-sm-12">
            <input type="text" className="form-control" id="new_headline" placeholder="update headline"
            ref={ (node) => { newheadline = node }} /> 
            </div>       
            { 
            <button id="button_update_user" value="Update your Headline" onClick={updateHeadline}>
            Update your headline </button>
            }         
            
        </div>

    )
}

export default connect(
    (state) => {
        return{
            avatar: state.profileReducer.avatar,
            headline: state.mainReducer.headlines.headline,
            username: state.profileReducer.username
        }
    },(dispatch) => {
        return {
            updateHeadline: () => dispatch(updateHeadline())
        }
    }

)(Headline)