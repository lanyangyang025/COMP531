export const url = 'https://webdev-dummy.herokuapp.com'

//action name

const Action = {

     ERROR: 'ERROR'
    ,SUCCESS: 'SUCCESS'

    ,GO_PROFILE: 'GO_PROFILE'
    ,GO_MAIN: 'GO_MAIN'
    ,GO_INDEX: 'GO_INDEX'

    ,ADD_ARTICLE: 'ADD_ARTICLE'
    ,UPDATE_ARTICLES: 'UPDATE_ARTICLES'
    ,EDIT_ARTICLE: 'EDIT_ARTICLE'
    ,SEARCH_KEYWORD: 'SEARCH_KEYWORD'
    ,UPDATE_AVATARS: 'UPDATE_AVATARS'
    ,FOLLOWER_UPDATE: 'FOLLOWER_UPDATE'

    ,UPDATE_HEADLINE: 'UPDATE_HEADLINE'
    ,UPDATE_AVATAR: 'UPDATE_AVATAR'
    ,UPDATE_USER: 'UPDATE_USER'
    ,UPDATE_EMAIL: 'UPDATE_EMAIL'
    ,UPDATE_ZIPCODE: 'UPDATE_ZIPCODE'
    ,UPDATE_PHONE: 'UPDATE_PHONE'
    ,UPDATE_PASSWORD: 'UPDATE_PASSWORD'
    ,UPDATE_CONFIRM: 'UPDATE_CONFIRM'

    ,LOGIN: 'LOGIN'

}
export default Action

export function updateError(error) { return { type: Action.ERROR, error }}
export function updateSuccess(success) { return { type: Action.SUCCESS, success }}
export function goToProfile() { return { type: Action.GO_PROFILE }}
export function goToMain() { return { type: Action.GO_MAIN }}
export function goToIndex() { return { type: Action.GO_INDEX }}


//fetch from url
export function resource(method, endpoint, payload, submitJson = true) {
    const options = {credentials: 'include', method}
    if (submitJson) options.headers = {'Content-Type': 'application/json'}
    if (payload) {
        options.body = submitJson ? JSON.stringify(payload) : payload
    }

    // fetch everything from dummy server
    return fetch(`${url}/${endpoint}`, options)
    .then((response) => {
        if (response.status === 401) {
            const message = `Error in ${method} ${endpoint} ${JSON.stringify(response.json())}`
            throw new Error(message)
        } 
        else if (response.status === 200) {
            if (response.headers.get('Content-Type').indexOf('json') > 0) {
                return response.json()
            }else {
                return response.text()
            }
        }
        else {
            // useful for debugging, but remove in production
            console.error(`${method} ${endpoint} ${response.statusText}`)
            throw new Error(response.statusText)
        }
    })
}