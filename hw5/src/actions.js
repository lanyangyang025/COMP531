import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

export const url = 'https://webdev-dummy.herokuapp.com'


export function updateError(error) { return { type: 'ERROR', error }}
export function updateSuccess(success) { return { type: 'SUCCESS', success }}
export function goToProfile() { return { type: 'GO_PROFILE' }}
export function goToMain() { return { type: 'GO_MAIN' }}
export function goToIndex() { return { type: 'GO_INDEX' }}


//fetch from url
export function resource(method, endpoint, payload, submitJson = true) {
    const options = {credentials: 'include', method};
    if (submitJson) options.headers = {'Content-Type': 'application/json'};
    if (payload) {
        options.body = submitJson ? JSON.stringify(payload) : payload;
    }

    // fetch everything from dummy server
    return fetch(`${url}/${endpoint}`, options)
    .then((response) => {
        if (response.status === 401) {
            const message = `Error in ${method} ${endpoint} ${JSON.stringify(response.json())}`;
            throw new Error(message);
        }
        else if (response.status === 200) {
            if (response.headers.get('Content-Type').indexOf('json') > 0) {
                return response.json();
            }else {
                return response.text();
            }
        }
        else {
            // useful for debugging, but remove in production
            console.error(`${method} ${endpoint} ${response.statusText}`)
            throw new Error(response.statusText);
        }
    })
}