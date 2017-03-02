import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {local_login} from './authActions'

const Login = ({login}) => {

    let username, password

    return (
        <div id="panel panel-default ">   
            <label id="panel-heading text-center"><font size="5">Login</font></label>
            <div id="panel-body text-center">  
            
                <div className="form-group">
                    <div className="col-sm-10">
                        <div className="col-sm-10">
                        <label className="form-control-label" htmlFor="username">User Name</label>
                        </div>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Username"  id="login_username" 
                        required ref={(node) => { username = node }} />
                        </div>
                    </div>

                    <div className="col-sm-10">
                        <div className="col-sm-10">
                        <label className="form-control-label" htmlFor="password">Password</label>
                        </div>
                        <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Password"  id="login_password" 
                        required ref={(node) => { password = node }} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-sm-offset-2">
                <button id="login_button_2" className="btn btn-primary btn-block" 
                       onClick={login}>Log in</button>
                </div>
            </div>
        </div>

    )
}

const mapDispatchToProps = dispatch => ({ login: () => (local_login(dispatch)) });

export default connect(null, mapDispatchToProps)(Login)
