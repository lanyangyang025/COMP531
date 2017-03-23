import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addFollower, delFollower, dispatch } from './followingActions'

const Follower = ({name, avatar, headline,dispatch }) => (
    <div className="users-container" name="follower">
        <div className="user-container">
            <div className="well">
                <img src={ avatar } className="img_friend" height="80" width="80" alt="Avatar"/>
                <h3>{name}</h3>
                <p>{headline}</p>
                <button id="unfollow_btn" onClick={() => { dispatch(delFollower(name)) }}>Unfollow</button>
                <br/><br/>
            </div>
        </div>
    </div>
)

//content of all the followers
class Following extends Component {
    render() { return (
        <div id ="following">
            { Object.keys(this.props.followers).sort().map((f) => this.props.followers[f]).map((follower) =>
                <Follower key={follower.name}
                          name={follower.name} avatar={follower.avatar} headline={follower.headline}
                          dispatch={this.props.dispatch} />
            )}
            <input id="add_a_follower" type="text"
                   placeholder="add a follower"
                   ref={(node) => this.new_follower = node }/>
            <button id="add_follower" 
                   onClick={() => {
                       this.props.dispatch(addFollower(this.new_follower.value));
                       this.new_follower.value = ''
                   }}>add follower</button>
                { this.props.error.length == 0 ? '' :
                    <div>
                        { this.props.error }
                    </div>
                }
        </div>

    )}
}


export default connect(
    (state) => {
        return {
            error: state.authReducer.error,
            followers: state.mainReducer.followers.followers
        }
    }
)(Following)