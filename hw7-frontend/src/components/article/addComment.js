import React from 'react'
import { connect } from 'react-redux'
import { add_Comment } from './articleActions'

//content of a comment
export const AddComment = ({dispatch, article}) => {
let text;
return(
	<div className="col-sm-9 col-sm-offset-3">
		<input type="text" className="form-control" id="new_comment" placeholder="add a comment" ref={ (node) => { text = node }}/>
		<button className="btn btn-primary btn-sm col-sm-offset-4" onClick={() => dispatch(add_Comment(text.value,article))}>{'Post'}</button>
	</div>
)
}

export default connect()(AddComment);
