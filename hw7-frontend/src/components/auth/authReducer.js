const state_initial={
	location: 'LANDING_PAGE',
	error: '',
	success: ''
}
const clean = { error: '', success: '' }


//reducer of the landing page
const authReducer = (state=state_initial, action) => {
	
	switch(action.type){
		case 'SUCCESS': 
			return {
                ...state,
                ...clean,
                success: action.success
            }     

		case 'ERROR': 
			return {
                ...state,
                ...clean,
                error: action.error
            }

        case 'GO_PROFILE':
        	return{
        		...clean,
        		location: 'PROFILE_PAGE'
        	}
		
		case 'GO_MAIN':
            return{
                ...clean,
                location: 'MAIN_PAGE'
            }

        case 'GO_INDEX':
            return{
                ...clean,
                location: 'LANDING_PAGE'
            }
            
        default:
        	return state
	}
}

export default authReducer