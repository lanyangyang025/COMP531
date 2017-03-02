import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {register,reset} from './authActions'

const Register = ({ dispatch }) => {

let username1, email1, phone1,  zipcode1, birth1, password1, confirm1

return(
    <div id="panel panel-default" >      
        <label id="panel-heading text-center"><font size="5">Register</font></label>

        <div id="panel-body text-center">
            <div className="form-group col-md-15">
                <div className="col-sm-10">
                    <div className="col-sm-10">
                    <label className="form-control-label" htmlFor="username">Account Name</label>
                    </div>
                    <div className="col-sm-10">
                    <input className="form-control" id="username" type="text" ref={(node) => username1 = node } placeholder="account name"/>
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="col-sm-10">
                    <label className="form-control-label" htmlFor="email">Email Address</label>
                    </div>
                    <div className="col-sm-10">
                    <input className="form-control" id="email" type="email" ref={(node) => email1 = node } placeholder="email address"/>
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="col-sm-10">
                    <label className="form-control-label" htmlFor="phone">Phone Number</label><br/>
                    </div>
                    <div className="col-sm-10">
                    <input className="form-control" id="phone" type="tel" ref={(node) => phone1 = node } placeholder="123-123-1234"/>
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="col-sm-10">
                    <label className="form-control-label" htmlFor="birth">Date of Birth</label><br/>
                    </div>
                    <div className="col-sm-10">
                    <input className="form-control" id="birth" type="date" ref={(node) => birth1 = node } placeholder="mm/dd/yyyy"/>                  
                    </div>
                </div>                
                <div className="col-sm-10">
                    <div className="col-sm-10">
                    <label className="form-control-label" htmlFor="zipcode">Zipcode</label><br/>
                    </div>
                    <div className="col-sm-10">
                    <input className="form-control"id="zipcode" type="zipcode" ref={(node) => zipcode1 = node } placeholder="77005"/>
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="col-sm-10">
                    <label className="form-control-label" htmlFor="password">Password</label><br/>
                    </div>
                    <div className="col-sm-10">
                    <input className="form-control"id="password" type="password" ref={(node) => password1 = node } placeholder="password"/>
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="col-sm-10">
                    <label className="form-control-label" htmlFor="confirm">Confirmation</label><br/>
                    </div>
                    <div className="col-sm-10">
                    <input className="form-control"id="confirm" type="password" ref={(node) => confirm1= node } placeholder="password confirmation"/>
                    </div>
                </div>
            </div>

            <div className="col-sm-3 col-sm-offset-1">
                <input type="button" value="Register" className="btn btn-primary" 
                onClick={() => {dispatch(register({username1, email1, phone1, birth1, zipcode1, password1, confirm1}))}}/>
            </div>
            <div className="col-sm-3 col-sm-offset-1">
                <input type="button" value="Reset" className="btn btn-primary" 
                onClick={() => {dispatch(reset())}}/>
            </div>
        </div>
    </div>
)
}

export default connect()(Register)
