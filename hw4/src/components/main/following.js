import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Follower } from './follower'

import { addFollower, delFollower, dispatch } from './followingActions'


export const Following = ({error='', followers, addTodo, dispatch }) => {
    let newFollower='';

    const _addTodo = () => {
        if (newFollower && newFollower.value) {
            addTodo(newFollower.value)
            newFollower.value = ''
        }
    }

    return (
        <div>
            <div id="follower1">
                <div className="well">
                    <img src="./images/Chestnut.jpg" className="img_friend" height="80" width="80" alt="Avatar"></img>
                    <h3>A1</h3>
                    <p><span id="currentStatus">Busy on homework!!</span></p>
                    <button type="button" className="btn_unfollow" id="unfollowA1" onClick={()=>{document.getElementById('follower1').innerHTML=''}}>
                    Unfollow</button>
                </div>
            </div>

            <div id="follower2">
                <div className="well">
                    <img src="./images/Circus.jpg" className="img_friend" height="80" width="80" alt="Avatar"></img>
                    <h3>B2</h3>
                    <p><span id="currentStatus">Busy on working!!</span></p>
                    <button type="button" className="btn_unfollow" id="unfollowB2" onClick={()=>{document.getElementById('follower2').innerHTML=''}}>
                    Unfollow</button>
                </div>
            </div>

            <div id="follower3">
                <div className="well">
                    <img src="./images/Copper.jpg" className="img_friend" height="80" width="80" alt="Avatar"></img>
                    <h3>C3</h3>
                    <p><span id="currentStatus">Busy on relaxing!!</span></p>
                    <button type="button" className="btn_unfollow" id="unfollowC3" onClick={()=>{document.getElementById('follower3').innerHTML=''}}>
                    Unfollow</button>
                </div>
            </div>

            { Object.keys(followers).sort().map((f) => followers[f]).map((follower) =>
                <div id={follower.name}>
                    <Follower key={follower.name} name={follower.name} avatar={follower.avatar} headline={follower.headline}
                    />
                </div>
            )}


            <div id ="following">

            <div className="col-sm-12">
                <input id="add_new_follower" type="text" className="form-control"
                       placeholder="add a follower"
                       ref={(node) => newFollower = node }/>
            </div> 



            <button id="add_follower" onClick={_addTodo}>add follower</button>


                { 
                    error.length == 0 ? '' :
                    <div>
                        { error }
                    </div>
                }
            </div>
        </div>
    )
}


export default connect(
    (state) => {
        return {
            error: state.authReducer.error,
            followers: state.mainReducer.followers.followers
        }
    },
    (dispatch) => {
        return {
            addTodo: (text) => dispatch(addFollower(text))
        }
    }
)(Following)