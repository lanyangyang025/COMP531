import Action, { updateError, resource } from '../../actions'

export function searchKeyword(keyword) {
    return { type: Action.SEARCH_KEYWORD, keyword }
}

export function showComments() {
    return(dispatch)=>{
        if (document.getElementById("showComments").value == "Show comments"){
            document.getElementById("showComments").value = "Hide Element"
//            return dispatch({ type: "SHOW_COMMENTS" });
        }else{
            document.getElementById("showComments").value = "Show Element"
//            return dispatch({ type: "HIDE_COMMENTS" });
        }
    }
}

export function addComment() {
    return(dispatch)=>{
        if (document.getElementById("addComment").value == "Add a comment"){
            document.getElementById("addComment").value == "Cancel to add a comment"
//            return dispatch({ type: "ADD_COMMENT" });
        }else{
            document.getElementById("addComment").value = "Add a comment"
//            return dispatch({ type: "CANCEL_ADD" });
        }
    }
}