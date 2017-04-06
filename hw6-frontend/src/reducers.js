import {combineReducers} from 'redux'
import authReducer from './components/auth/authReducer'
import mainReducer from './components/main/mainReducer'
import profileReducer  from './components/profile/profileReducer'
import articleReducer  from './components/article/articleReducer'

//combine all the reducers
const Reducer = combineReducers({
		authReducer : authReducer,
		mainReducer : mainReducer,
		profileReducer : profileReducer,
		articleReducer: articleReducer
})

export default Reducer
