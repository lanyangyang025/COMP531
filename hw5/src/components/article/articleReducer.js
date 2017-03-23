const initialState = {
	btnShowValue: '', 
	articles: {} ,
	searchKeyword: ''
}


//the reducer of the article component
const articleReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SHOW_COMMENTS':
			let btnShowValue= "Hide comments";
			return { ...state, btnShowValue };
		case 'HIDE_COMMENTS':
			return { ...state, btnShowValue: "Show comments" };
		case 'SEARCH_KEYWORD':
            return { ...state, searchKeyword: action.keyword }; 
        case 'GET_ARTICLE':
            return {...state, articles: action.articles};
        case 'ADD_ARTICLES':
            const articles = { ...state.articles };
            articles[action.article.id] = action.article
            return { ...state, articles };
	    default:
	    	return state;
	}
}

export default articleReducer