import Action from '../../actions'
import {combineReducers} from 'redux'

const initial_followers = {
	followers: {} 
}

const initial_articles = {
	articles: {}, 
	searchKeyword: '', 
	avatars: {}
}



export function followers(state = initial_followers, action) {
    switch(action.type) {
        case Action.FOLLOWER_UPDATE:
            return { ...state, followers: action.followers }
        default:
            return state
    }
}


export function articles(state = initial_articles, action) {
    switch(action.type) {
        case Action.ADD_ARTICLE:
            const articles = { ...state.articles }
            articles[action.article.id] = action.article
            return { ...state, articles }
        case Action.UPDATE_ARTICLES:
            return { ...state, articles: action.articles }
        case Action.SEARCH_KEYWORD:
            return { ...state, searchKeyword: action.keyword }
        case Action.UPDATE_AVATARS:
            return { ...state, avatars: action.avatars }
        default:
            return state
    }
}               
		
const mainReducer = combineReducers({
	followers, articles
})

export default mainReducer
