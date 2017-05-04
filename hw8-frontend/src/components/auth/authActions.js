import { validateProfile } from '../profile/profileActions'
import {resource, updateError, updateSuccess, goToMain, goToIndex} from '../../actions'
import {getAvatar} from '../profile/profileActions'
import {getHeadline, getUser} from '../main/mainActions'
import {getFollowing} from '../main/followingActions'
import {getEmail} from '../profile/profileActions'
import {getZipcode} from '../profile/profileActions'
import {getDob} from '../profile/profileActions'
import {getArticle} from '../article/articleActions'
const serverURL='https://quiet-caverns-31163.herokuapp.com'

export function initialVisit() {
    return (dispatch) => {
        resource('GET', 'headlines').then((response) => {       
            dispatch(getFollowing());
            dispatch(getHeadline());
            dispatch(getEmail());
            dispatch(getZipcode());
            dispatch(getAvatar());
            dispatch(getDob());
            dispatch(getUser())
        })
        .then((response) => {
            dispatch(goToMain());
        }).catch((err) => {})
    }
}


export function initialVisit_1() {
    return (dispatch) => {   
        resource('GET', 'headlines')   
        .then((err) => {
            dispatch(getFollowing());
            dispatch(getHeadline());
            dispatch(getEmail());
            dispatch(getZipcode());
            dispatch(getAvatar());
            dispatch(getDob());
            dispatch(goToMain())
            dispatch(getUser())
        }).catch((err) => {
                dispatch({type: 'LOGIN', username: undefined});
                dispatch({type:'GO_INDEX'});
            
        })
    }
}



//action when log in
export function login() {
    let username=document.getElementById('login_username').value
    let password=document.getElementById('login_password').value
    return (dispatch) =>{
        resource('POST', 'login', { username, password })
            .then((r) => { 
                dispatch(updateSuccess('Log in successfully'));
                dispatch({type: 'LOGIN', username: r.username});
                dispatch(initialVisit()) ;
            })
            .catch((err) => {
                dispatch(updateError(`Error when logging in as ${username}`));
            })
        }
}

//action when log out
export function logout() {
    return (dispatch) => {
        resource('PUT', 'logout')
            .then((r)=>{
                dispatch({type:'GO_INDEX'});
                })
            .catch((err) => {
                dispatch({type: 'LOGIN', username: undefined});
                dispatch({type:'GO_INDEX'});
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
    const username=username1.value;
    const email=email1.value;
    const phone=phone1.value;
    const birth=birth1.value;
    const zipcode=zipcode1.value;
    const password=password1.value;
    const confirm=confirm1.value;
    return (dispatch) => {
        if (!username || !email|| !phone || !birth || !zipcode || !password || !confirm) {
            return dispatch(updateError('All fields must be supplied'));
        }

        const err = validateProfile({username, email, phone, zipcode, password, confirm})
        if (err.length > 0) {
            return dispatch(updateError(err));
        }

        resource('POST', 'register', {username: username, email: email, dob: birth, zipcode: zipcode, password: password})
        .then((response) => {
            return dispatch(updateSuccess(`Success!  You can now log in as "${response.username}".`));
        }).catch((err) => {
            return dispatch(updateError("There was an error registering, perhaps your username is already taken?"));
        })
    }
}

export function logInFacebook() {
    window.top.location = serverURL + "/facebook/login";
}
