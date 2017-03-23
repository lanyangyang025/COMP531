import Promise from 'bluebird'
import { resource, updateError } from '../../actions'
import {getArticle} from '../article/articleActions'

//actions of deleting a follower and adding a follower

export function delFollower(name) {return getFollowers('DELETE', name)};
export function addFollower(name) {return getFollowers('PUT', name)};
export function getFollowing() {return getFollowers('GET','')};


export function getFollowers(method, name){
    return (dispatch, getState) => {
    	if(method=='PUT' && getState().mainReducer.followers.followers[name]){
    		return dispatch(updateError(`${name} is already followed`));
    	}

		resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
        .then((r) => {

            if (method == 'PUT' && r.following.indexOf(name) < 0) {
                return dispatch(updateError(`${name} is not a valid user`));
            }

            const followers = r.following.reduce((o, v, i) => { o[v] = {name: v}; return o }, {});
            const all_follower = r.following.join(',');

            const all_headline = resource('GET', `headlines/${all_follower}`)
                .then((r) => {
                    r.headlines.forEach((e) => {
                        const follower_1 = followers[e.username];
                        if (follower_1 !== undefined) {
                            follower_1.headline = e.headline;
                        }
                    })
                })

            const all_avatar = resource('GET', `avatars/${all_follower}`)
                .then((r) => {
                    r.avatars.forEach((e) => {
                        const follower_1 = followers[e.username];
                        if (follower_1) {
                            follower_1.avatar = e.avatar;
                        }
                    })
                })

            Promise.all([all_headline, all_avatar]).then(() => {
                dispatch({type: 'FOLLOWER_UPDATE', followers});
            })
        })
        .then((r) => {dispatch(getArticle())})
        .catch((err) => {
            dispatch(updateError(`There was an error getting your list of followed users ${err}`));
        })
    }
}



