import Action from '../../actions'

const state_initial={
	location: 'LANDING_PAGE',
	error: '',
	success: ''
}

const authReducer = (state={
	state_initial
}, action) => {
	const clean = { error: '', success: '' }
	switch(action.type){
		case Action.SUCCESS: 
			return {
                ...state,
                ...clean,
                success: action.success
            }     

		case Action.ERROR: 
			return {
                ...state,
                ...clean,
                error: action.error
            }

        case Action.GO_PROFILE:
        	return {
                ...state,
                ...clean,
                location : 'PROFILE_PAGE'
            }
		
		case Action.GO_MAIN:
		    return {
                ...state,
                ...clean,
                location : 'MAIN_PAGE'
            }

        case Action.GO_INDEX:
		    return {
                ...state,
                ...clean,
                location : 'LANDING_PAGE'
            }
            
        default:
        	return state
	}
}

export default authReducer