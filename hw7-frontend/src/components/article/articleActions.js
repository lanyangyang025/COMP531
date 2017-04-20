import { updateError, resource } from '../../actions'

var id=1;

export function getArticle() {
    return (dispatch) => {
        return resource('GET', 'articles').then((r) => {
            dispatch({ type: 'GET_ARTICLE', articles: r.articles });
        })
    }
}


export function addArticle(text1, image) {
//    let newDate = new Date();

//    const fd = new FormData();
//    fd.append('_id',id++);
//    fd.append('text', text1);
//    fd.append('image', image);
//    fd.append('date', newDate.toLocaleDateString())
    const payload = { text: text1 };

    return(dispatch)=>{
        if (text1==''){
            return ;
        }
        //return resource('POST', 'article', fd, false)
        return resource('POST', 'article', payload)
        .then((r) => {
            const article = r.articles[0];
            dispatch({ type: 'ADD_ARTICLES', article});
        }) 
    }
}

export function add_Comment(text1,article) {
    let articleId=article._id;
    const payload = { text: text1, commentId: -1 };

    return(dispatch)=>{
        return resource('PUT', `articles/${articleId}`, payload)
            .then((r) => {
                dispatch({ type: 'GET_UPDATE', articles: r.articles });
            })
        }
}

export function searchKeyword(keyword) {
    return { type: 'SEARCH_KEYWORD', keyword };
}

export function showComments(article){
    return(dispatch) => {
        article.displayComment? 
        dispatch({type : 'HIDE_COMMENT', payload : article}) : dispatch({type : 'SHOW_COMMENT', payload : article})  
    }  
}

export function addComments(article){
    return(dispatch) => {
        article.displayaddComment? 
        dispatch({type : 'ADD_COMMENT', payload : article}) : dispatch({type : 'HIDE_ADD_COMMENT', payload : article})  
    }  
}

export function editComment(word, comment, article){
    const payload = { text: word, commentId: comment.commentId };
    let articleId=article._id
    return(dispatch)=>{
        return resource('PUT', `articles/${articleId}`, payload)
            .then((r) => {
                dispatch({ type: 'GET_UPDATE_1', articles: r.articles });
            })
        } 
}

export function editPost(word, article){
    const payload = { text: word};
    let articleId=article._id
    return(dispatch)=>{
        return resource('PUT', `articles/${articleId}`, payload)
            .then((r) => {
                dispatch({ type: 'GET_UPDATE', articles: r.articles });
            })
        } 
}