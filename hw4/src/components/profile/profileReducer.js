import Action from '../../actions'

const state_initial={
	username:'Yiqing Lu',
    headline: 'Busy on coding!!',
    avatar: '..dist/images/Bottles.jpg',
    zipcode: '77005',
    email: 'yl128@rice.edu',
    phone:'123-234-3456',
    password:'123456',
    confirm:'123456'
}


const profileReducer = (state={
	state_initial
}, action) => {
	switch(action.type){
		case Action.UPDATE_HEADLINE: 
			return { ...state, headline: action.headline }     

		case Action.LOGIN: 
			return { ...state, username: action.username }  

        case Action.UPDATE_AVATAR:
            return { ...state, avatar: action.avatar }

        case Action.UPDATE_USER:
            return { ...state, username: action.username }
        

        case Action.UPDATE_EMAIL:
            return { ...state, email: action.email }
        

        case Action.UPDATE_ZIPCODE:
            return { ...state, zipcode: action.zipcode }
        

        case Action.UPDATE_PHONE:
            return { ...state, phone: action.phone }
        

        case Action.UPDATE_PASSWORD:
            return { ...state, password: action.password }

        case Action.UPDATE_CONFIRM:
            return { ...state, confirm: action.confirm }

        default:
        	return state
	}
}

export default profileReducer 