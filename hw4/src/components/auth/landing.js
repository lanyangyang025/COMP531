import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'

//display error message
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



//content of the landing page
const Landing = () => (
    <div>
        <div className="landing_index text-center">
            <div className="landing_div">
                <h1><b>Welcome to Ricebook!</b></h1>
            </div>
        </div>


		<ErrorMessage/>

        <div className="container">
            <div className="col-sm-6">    
            <Register />         
            </div>
            
            <div className="col-sm-6">
            <Login />
            </div>
          
        </div>

        <footer className="container-fluid text-center">
            <p>RiceBook © 2017</p>
            <p>Contact: yl128@rice.edu</p>
        </footer>
        
    </div>



)

export default Landing