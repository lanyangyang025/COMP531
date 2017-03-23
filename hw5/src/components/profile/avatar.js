import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateImage } from './profileActions'

//The current user profile
const Avatar = ({username, email, phone, zipcode, password, confirm, dispatch}) =>{

return( 
	<div className="well col-sm-2 col-sm-offset-2">

		<div className="container-fluid">
			<p><img src="./images/Bottles.jpg" id="profile_img" className="img-circle col-sm-10"></img></p>
			<p></p>
			<p><input type="file" id="file"/></p>
		    <h3 className="form-signin-heading">Current Info</h3>
	        <label className="control-label col-sm-12" size="3">Account Name: <span id ="profile_username">{ username ? username : "Yiqing"}</span></label><br/>
	        <label className="control-label col-sm-12" size="3">E-mail: <span id="profile_email">{email ? email : "yl128@rice.edu"}</span></label><br/>
	        <label className="control-label col-sm-12" size="3">Phone: <span id="profile_phone">{phone ? phone:"123-234-3456"}</span></label><br/>
	        <label className="control-label col-sm-12" size="3">Birth: 01-01-2000</label><br/>
	        <label className="control-label col-sm-12" size="3">Zipcode: <span id="profile_zipcode">{zipcode?zipcode:"12345"}</span></label><br/>
	        <label className="control-label col-sm-12" style={{visibility: "hidden"}} size="3"> ><span id="profile_password">Password: {password?password:"123456"}</span></label> <br/>
			<label className="control-label col-sm-12" style={{visibility: "hidden"}} size="3"><span id="profile_confirm">Confirm: {confirm?confirm:"123456"}</span></label><br/>

		</div>
	</div>
)
}

export default connect(
    (state) => {
        return{
            username: state.profileReducer.username,
            email: state.profileReducer.email,
            phone: state.profileReducer.phone,
            zipcode: state.profileReducer.zipcode,
            password: state.profileReducer.password,
            confirm: state.profileReducer.confirm
        }
    }
)(Avatar)