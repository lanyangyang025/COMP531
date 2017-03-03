import React from 'react'
import { connect } from 'react-redux'

import Landing from './components/auth/landing'
import Main from './components/main/main'
import Profile from './components/profile/profile'


//refer to specific page
const App = ({ location }) => {

    if (location == 'MAIN_PAGE') { 
        return <Main />
    } else if (location == 'PROFILE_PAGE') {
        return <Profile />
    } else {
        return <Landing />
    }

}
export default connect(
    (state) => {
        return {
            location: state.authReducer.location
        }
    }
)(App)