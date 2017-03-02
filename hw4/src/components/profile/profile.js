import React, { Component, PropTypes } from 'react'
import ProfileForm from './profileForm'
import Avatar from './avatar'
import ProfileNav from './profileNav'
import { connect } from 'react-redux'

let ErrorMessage = ({error='', success=''}) => (
    <div className="row">
        { error.length == 0 ? '' :
            <div className="alert alert-danger">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="errorMessage">{ error }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
        { success.length == 0 ? '' :
            <div className="alert alert-success">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="successMessage">{ success }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
    </div>
)

ErrorMessage = connect((state) => {
    return { error: state.authReducer.error, success: state.authReducer.success }
})(ErrorMessage)


const Profile = () => {
    return (
        <div>
            <ProfileNav />
            <ErrorMessage />
            <Avatar/>
            <ProfileForm />

        </div>
    )
}

export default Profile