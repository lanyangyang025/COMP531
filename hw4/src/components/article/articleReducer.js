const initialState = {
	btnShowValue: "Show comments", 
	btnAddValue: "Add a comment",
	articles: {} ,
	searchKeyword: ''
}

const articleReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SHOW_COMMENTS':{
			return { ...state, btnShowValue: "Hide comments"};
		}
		case 'ADD_COMMENT':
			return { ...state, btnAddValue: "Cancel to add a comment"};
		case 'HIDE_COMMENTS':
			return { ...state, btnShowValue: "Show comments"};
		case 'CANCEL_ADD':
			return { ...state, btnAddValue: "Add a comment"};
		case 'SEARCH_KEYWORD':
            return { ...state, searchKeyword: action.keyword }; 
		case 'ADD_ARTICLES':
			return { ...state, articles: action.articles };

	    default:
	    	return state;
	}
}

export default articleReducer