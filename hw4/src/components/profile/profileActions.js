import Action, { updateError, updateSuccess, resource } from '../../actions'

//acton of updating the username
function updateUsername(){
    return (dispatch) => {
        document.getElementById("profile_username").innerHTML= document.getElementById("pro_username").value;
        const payload = { username: document.getElementById("pro_username").value };
        document.getElementById("pro_username").value = null;
        return resource('PUT', 'username', payload).then((r) => {
            dispatch({ type: 'UPDATE_USER', username: r.username});
        })
    }
}

//acton of updating the email
function updateEmail(){
    return (dispatch) => {
        document.getElementById("profile_email").innerHTML = document.getElementById("pro_email").value;
        const payload = { email: document.getElementById("pro_email").value };
        document.getElementById("pro_email").value = null;
        return resource('PUT', 'email', payload).then((r) => {
            dispatch({ type: 'UPDATE_EMAIL', email: r.email});
        })
    }
}

//acton of updating the phone number
function updatePhone(){
    return (dispatch) => {
        document.getElementById("profile_phone").innerHTML=document.getElementById("pro_phone").value
        const payload = { phone: document.getElementById("pro_phone").value };
        document.getElementById("pro_phone").value = null;
        return resource('PUT', 'phone', payload).then((r) => {
            dispatch({ type: 'UPDATE_PHONE', phone: r.phone});
        })
    }
}

//acton of updating the zipcode
function updateZipcode(){
    return (dispatch) => {
        document.getElementById("profile_zipcode").innerHTML=document.getElementById("pro_zipcode").value
        const payload = { zipcode: document.getElementById("pro_zipcode").value };
        document.getElementById("pro_zipcode").value = null;
        return resource('PUT', 'zipcode', payload).then((r) => {
            dispatch({ type: 'UPDATE_ZIPCODE', zipcode: r.zipcode});
        })
    }
}

//acton of updating the password
function updatePassword(){
    return (dispatch) => {
        const payload = { password: document.getElementById("pro_password").value };
        document.getElementById("pro_password").value = null;
        return resource('PUT', 'password', payload).then((r) => {
            dispatch({ type: 'UPDATE_PASSWORD', password: r.password});
        })
    }
}

//acton of updating the confirm password
function updateConfirm(){
    return (dispatch) => {
        const payload = { confirm: document.getElementById("pro_confirm").value };
        document.getElementById("pro_confirm").value = null;
        return resource('PUT', 'confirm', payload).then((r) => {
            dispatch({ type: 'UPDATE_CONFIRM', confirm: r.confirm});
        })
    }
}

//action of updating the user profile
export function update_profile() {
    const username=document.getElementById("pro_username").value
    const email=document.getElementById("pro_email").value
    const phone=document.getElementById("pro_phone").value
    const zipcode=document.getElementById("pro_zipcode").value
    const password=document.getElementById("pro_password").value
    const confirm=document.getElementById("pro_confirm").value

    return (dispatch) => {
        if(username=='' && email=='' && phone=='' && zipcode=='' && password=='' && confirm==''){
            dispatch(updateError('Nothing update!'))
        }
        else{
            const err = validateProfile({username, email, phone, zipcode, password, confirm})   
            if (err.length > 0) {
                dispatch(updateError(err))
            }
            else{
                dispatch(updateSuccess(`Success for updating!`))

                if(username){
                    dispatch(updateUsername())
                }
                
                if(email){
                    dispatch(updateEmail())
                }
                
                if(phone){
                    dispatch(updatePhone())
                }

                if(zipcode){
                    dispatch(updateZipcode())                
                }            
     
                if(password){
                    dispatch(updatePassword())                
                }

                if(confirm){
                    dispatch(updateConfirm())
                } 
            }                 
        }
    }
}

//action to verify whether the pattern of each text is correct
export function validateProfile({username, email, phone, zipcode, password, confirm}) {
    var pattern;
    pattern = new RegExp("^[a-zA-Z][a-zA-Z0-9]+$");
    if (username) {
        if (!pattern.test(username)) {
            return 'Invalid username.  Must start with a letter and can only contains letters and numbers.'
        }
    }

    pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
    if (email) {
        if (!pattern.test(email)) {
            return 'Invalid email.  Must be like a@b.co'
        }
    }

    pattern = new RegExp("^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$");
    if (phone) {
        if (!pattern.test(phone)) {
            return 'Invalid phone.  Must be like 123-123-1234'
        }
    }

    pattern = new RegExp("^[0-9][0-9][0-9][0-9][0-9]$");
    if (zipcode) {
        if (!pattern.test(zipcode)) {
            return 'Invalid zipcode.  Must be 5 digits in length, e.g., 77005'
        }
    }

    if (password || confirm) {
        if (password !== confirm) {
            return 'Password do not match'
        }
    }

    return ''

}