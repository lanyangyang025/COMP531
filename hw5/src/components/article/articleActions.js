import { updateError, resource } from '../../actions'

export function getArticle() {
    return (dispatch) => {
        return resource('GET', 'articles').then((r) => {
            document.getElementById("showComment").value = "Show comments"
            dispatch({ type: "HIDE_COMMENTS"});
            dispatch({ type: 'GET_ARTICLE', articles: r.articles });
        })
    }
}


export  function addArticle(text1) {
    let newDate = new Date();
    const payload = { text: text1, date: newDate.toLocaleDateString() };
    return(dispatch)=>{
        return resource('POST', 'article', payload)
            .then((r) => {
                const article = r.articles[0];
                dispatch({ type: 'ADD_ARTICLES', article});
        })   
    }
}

export function searchKeyword(keyword) {
    return { type: 'SEARCH_KEYWORD', keyword };
}

export function showComments() {
    return(dispatch)=>{
        if (document.getElementById("showComment").value == "Show comments"){
            document.getElementById("showComment").value = "Hide comments";
            dispatch({ type: "SHOW_COMMENTS"});
        }else{
            document.getElementById("showComment").value = "Show comments";
            dispatch({ type: "HIDE_COMMENTS"});
        }
    }
}
