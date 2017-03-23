import Action, { updateError, resource } from '../../actions'

//action of updating headline
export function updateHeadline(){
	return (dispatch) => {
	    const payload = { headline: document.getElementById("new_headline").value };
	    document.getElementById("new_headline").value = null;
	    return resource('PUT', 'headline', payload).then((r) => {
	        dispatch({ type: 'UPDATE_HEADLINE', headline: r.headline});
	    })
	}
} 

export function getHeadline (){
	return (dispatch) => {
		return resource('GET', `headlines`).then((r) => {
	        dispatch({ type: 'GET_HEADLINE', headline: r.headlines[0].headline });
	    })
	}
}
