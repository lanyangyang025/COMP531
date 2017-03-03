import { validateProfile } from '../profile/profileActions'
import Action, {resource, updateError, updateSuccess, goToMain, goToIndex} from '../../actions'

//action when log in
export const local_login = (dispatch) => {
    const username = document.querySelector("#login_username").value;
    const password = document.querySelector("#login_password").value;
    return resource('POST', 'login', { username, password })
        .then(r => {
//            dispatch({type: Action.LOGIN, username: response.username})
            dispatch(goToMain())          
        })
        .catch((err) => {
            dispatch(updateError(`Error when logging in as ${username}`))
        })
}

//action when log out
export function logout() {
    return (dispatch) => {
        resource('PUT', 'logout')
            .then(dispatch({type:Action.GO_INDEX}))
            .catch((err) => {
                dispatch({type: Action.LOGIN, username: undefined})
                dispatch(goToIndex())
            })
    }
}

//reset all the values 
export function reset(){
    return({dispatch})=>{
        document.getElementById("username").value = '';
        document.getElementById("email").value = '';
        document.getElementById("phone").value = '';
        document.getElementById("birth").value = '';
        document.getElementById("zipcode").value = '';
        document.getElementById("password").value = '';
        document.getElementById("confirm").value = '';
    }
}

//action when register
export function register({username1, email1, phone1, birth1, zipcode1, password1, confirm1}) {
    const username=username1.value
    const email=email1.value
    const phone=phone1.value
    const birth=birth1.value
    const zipcode=zipcode1.value
    const password=password1.value
    const confirm=confirm1.value
    return (dispatch) => {
        if (!username || !email|| !phone || !birth || !zipcode || !password || !confirm) {
            return dispatch(updateError('All fields must be supplied'))
        }

        const err = validateProfile({username, email, phone, zipcode, password, confirm})
        if (err.length > 0) {
            return dispatch(updateError(err))
        }

        resource('POST', 'register', {username, email, phone, birth, zipcode, password, confirm})
        .then((response) => {
            return dispatch(updateSuccess(`Success!  You can now log in as "${response.username}".`))
        }).catch((err) => {
            return dispatch(updateError("There was an error registering, perhaps your username is already taken?"))
        })
    }
}
