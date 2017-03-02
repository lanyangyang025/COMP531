import Promise from 'bluebird'
import Action, { resource, updateError } from '../../actions'

export function delFollower(name) {return getFollowers('DELETE', name)}
export function addFollower(name) {return getFollowers('PUT', name)}

export function getFollowers(method, name){
    return (dispatch, getState) => {
    	if(method=='PUT' && getState().mainReducer.followers.followers[name]){
    		return dispatch(updateError(`${name} is already followed`))
    	}

		resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
        .then((response) => {

            if (method == 'PUT' && response.following.indexOf(name) < 0) {
                return dispatch(updateError(`${name} is not a valid user`))
            }

            const followers = response.following.reduce((o, v, i) => { o[v] = {name: v}; return o }, {})
            const followerList = response.following.join(',')

            const headlinePromise = resource('GET', `headlines/${followerList}`)
                .then((response) => {
                    response.headlines.forEach((s) => {
                        const user = followers[s.username]
                        if (user) {
                            user.headline = s.headline
                        }
                    })
                })

            const avatarPromise = resource('GET', `avatars/${followerList}`)
                .then((response) => {
                    response.avatars.forEach((s) => {
                        const user = followers[s.username]
                        if (user) {
                            user.avatar = s.avatar
                        }
                    })
                })

            Promise.all([headlinePromise, avatarPromise]).then(() => {
                dispatch({type: Action.FOLLOWER_UPDATE, followers})
            })
        }).catch((err) => {
            dispatch(updateError(`There was an error getting your list of followed users ${err}`))
        })
    }
}

