const initialState = {
	articles: [] ,
	searchKeyword: '',
	comments: []
}


//the reducer of the article component
const articleReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SHOW_COMMENT':
			return Object.assign({}, state, 
				{articles : state.articles.map((article) => 
					(article._id === action.payload._id? {...article, displayComment : true} :  article )
				)}
			)

		case 'HIDE_COMMENT':
			return Object.assign({}, state, 
				{articles : state.articles.map((article) => 
					(article._id === action.payload._id?  {...article, displayComment : false} :  article )
				)}
			)

		case 'ADD_COMMENT':
			return Object.assign({}, state, 
				{articles : state.articles.map((article) => 
					(article._id === action.payload._id? {...article, displayaddComment : false} :  article )
				)}
			)

		case 'HIDE_ADD_COMMENT':
			return Object.assign({}, state, 
				{articles : state.articles.map((article) => 
					(article._id === action.payload._id? {...article, displayaddComment : true} :  article )
				)}
			)

		case 'SEARCH_KEYWORD':
            return { ...state, searchKeyword: action.keyword }; 
        case 'GET_ARTICLE':
            return {...state, articles: action.articles};
        case 'GET_UPDATE':
			return Object.assign({}, state, 
				{articles : state.articles.map((article1) => {
        			
				if(article1._id === action.articles[0]._id){
					action.articles[0].displayComment=article1.displayComment
					return action.articles[0]
				}
				else{
					return article1
				}
			})}
			)
			

		case 'GET_UPDATE_1':
			return Object.assign({}, state, 
				{articles : state.articles.map((article1) => {
        			
				if(article1._id === action.articles[0]._id){
					action.articles[0].displayComment=article1.displayComment
					action.articles[0].displayaddComment=article1.displayaddComment
					return action.articles[0]
				}
				else{
					return article1
				}
			})}
			)

        case 'ADD_ARTICLES':
            let articles = state.articles;
            articles[action.article._id] = action.article
            return { ...state, articles };
	    default:
	    	return state;
	}
}

export default articleReducer