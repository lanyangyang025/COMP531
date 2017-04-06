import Action from '../../actions'

const state_initial={
	username:'Yiqing Lu',
    avatar: './images/Bottles.jpg',
    zipcode: '12345',
    email: 'yl128@rice.edu',
    phone:'123-234-3456',
    password:'123456',
    confirm:'123456'
}

//reducer of the profile page
const profileReducer = (state={
	state_initial
}, action) => {
	switch(action.type){
        case 'CHANGE_AVATAR':
        return Object.assign({}, state, {avatar : action.payload})

        case 'GET_EMAIL':
            return {...state, email: action.email};
        
        case 'GET_ZIPCODE':
            return {...state, zipcode: action.zipcode };

        case 'GET_AVATAR':
            return {...state, avatar: action.avatar };

		case 'LOGIN': 
			return { ...state, username: action.username } ; 

        case 'UPDATE_USER':
            return { ...state, username: action.username };
        

        case 'UPDATE_EMAIL':
            return { ...state, email: action.email };
        

        case 'UPDATE_ZIPCODE':
            return { ...state, zipcode: action.zipcode };
        

        case 'UPDATE_PHONE':
            return { ...state, phone: action.phone };
        

        case 'UPDATE_PASSWORD':
            return { ...state, password: action.password };

        case 'UPDATE_CONFIRM':
            return { ...state, confirm: action.confirm };

        default:
        	return state;
	}
}

export default profileReducer 