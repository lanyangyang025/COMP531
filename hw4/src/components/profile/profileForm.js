import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {update_profile} from './profileActions'


const ProdfileForm = ({ dispatch }) => {

let username1, email1, phone1,  zipcode1, password1, confirm1

return(
<div className="container col-sm-offset-1">
    <div className="col-sm-6"> 
        <div id="panel panel-default" >      
            <label id="panel-heading text-center"><font size="5">Update profile</font></label>

            <div id="panel-body text-center">

                <div className="form-group col-md-15">
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <div className="col-sm-10">
                            <label className="form-control-label" htmlFor="username">Account Name</label><br/>
                            </div>
                            <div className="col-sm-10">
                            <input className="form-control" id="pro_username" type="text" ref={(node) => username1 = node } placeholder="account name"/>
                            </div>
                        </div>

                        <div className="col-sm-10">
                            <div className="col-sm-10">
                            <label className="form-control-label" htmlFor="email">Email Address</label><br/>
                            </div>
                            <div className="col-sm-10">
                            <input className="form-control" id="pro_email" type="email" ref={(node) => email1 = node } placeholder="email address"/>
                            </div>
                        </div>

                        <div className="col-sm-10">
                            <div className="col-sm-10">
                            <label className="form-control-label" htmlFor="phone">Phone Number</label><br/>
                            </div>
                            <div className="col-sm-10">
                            <input className="form-control" id="pro_phone" type="tel" ref={(node) => phone1 = node } placeholder="123-123-1234"/>
                            </div>
                        </div>
                   

                        <div className="col-sm-10">
                            <div className="col-sm-10">
                            <label className="form-control-label" htmlFor="zipcode">Zipcode</label><br/>
                            </div>
                            <div className="col-sm-10">
                            <input className="form-control" id="pro_zipcode" type="zipcode" ref={(node) => zipcode1 = node } placeholder="77005"/>
                            </div>
                        </div>

                        <div className="col-sm-10">
                            <div className="col-sm-10">
                            <label className="form-control-label" htmlFor="password">Password</label><br/>
                            </div>
                            <div className="col-sm-10">
                            <input className="form-control" id="pro_password" type="password" ref={(node) => password1 = node } placeholder="password"/>
                            </div>
                        </div>

                        <div className="col-sm-10">
                            <div className="col-sm-10">
                            <label className="form-control-label"  htmlFor="confirm">Confirmation</label><br/>
                            </div>
                            <div className="col-sm-10">
                            <input className="form-control"id="pro_confirm" type="password" ref={(node) => confirm1= node } placeholder="password confirmation"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-sm-5">
                        <input type="button" value="Update" className="btn btn-primary" 
                        onClick={() => {dispatch(update_profile())}}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default connect()(ProdfileForm)

