import Action, { updateError, resource } from '../../actions'

export function updateHeadline(){
		return (dispatch) => {
	    const payload = { headline: document.getElementById("new_headline").value };
	    document.getElementById("new_headline").value = null;
	    return resource('PUT', 'headline', payload).then((r) => {
	        dispatch({ type: 'UPDATE_HEADLINE', headline: r.headline});
	    })
	}
} 
