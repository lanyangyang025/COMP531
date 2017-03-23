import {combineReducers} from 'redux'

const initial_followers = {
	followers: {} 
}

const initial_articles = {
	articles: {}, 
	searchKeyword: '', 
	avatars: {}
}

const initial_headline={
    headline: ''
}


//reducer of the main page
export function followers(state = initial_followers, action) {
    switch(action.type) {
        case 'FOLLOWER_UPDATE':
            return { ...state, followers: action.followers };
        default:
            return state;
    }
}


export function articles(state = initial_articles, action) {
    switch(action.type) {
        case 'UPDATE_ARTICLES':
            return { ...state, articles: action.articles };
        default:
            return state;
    }
}               
	
export function headlines(state = initial_headline, action) {
     switch(action.type) {
        case 'UPDATE_HEADLINE':
            return {...state, headline: action.headline};
        case 'GET_HEADLINE':{
            return {...state, headline: action.headline};
        }
        default:
            return state;
    }
}

const mainReducer = combineReducers({
	followers, articles, headlines
})

export default mainReducer
