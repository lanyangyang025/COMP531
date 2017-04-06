import React from 'react'
import { connect } from 'react-redux'
import { editComment } from './articleActions'

//content of a comment
export const Comment = ( {date, author, text, username, comment, dispatch, article} ) => {
let word;
return(
	<div className="col-sm-9 col-sm-offset-3 well">
	  	<div className="well">
	      	<p><span>On {date}, {author} commented:</span></p>
	      	
	      	<div>
	      	{
	      		(author==username)?(
	      		<div>
	      			<input type="text" className="form-control col-sm-12" id='edit_comment' value={text} ref={ (node) => { word = node }} 
	      			onChange={()=>{dispatch(editComment(word.value, comment, article))}}></input>
			    </div>
			    )
			    :<p>{text}</p>
	    	}
	        </div>

		</div>
	</div>
	)
}

export default connect()(Comment);

