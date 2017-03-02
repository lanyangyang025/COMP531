import React from 'react'
import { connect } from 'react-redux'

import { showComments, addComment } from './articleActions'
import { Comment } from './comment'

export const Article = ({ _id, author, date, text, img, comments, btnShowValue, btnAddValue}) => (
	<div className="panel panel-default text-left">
        <div className="panel-body">
			<div className="col-sm-3">
	          	<div className="well">
				<p><span>{date}, {author}:</span></p>
				</div>
	      	</div>

	      	<div className="col-sm-9">
	        	<p><img src={img} id="december18" className="ys"></img></p>
	        	<p>{text}</p>
	         	<input type="button" className="showComments" id="showComments" onClick={ showComments() } value={btnShowValue?btnShowValue:"Show comments"}></input>
	   			<input type="button" className="addComment" id="addComment" onClick={ addComment() } value={btnAddValue?btnAddValue:"Add a comment"}></input>
	   			<input type="button" className="addComment" id="addComment" value={"Edit the article"}></input>

	     	</div>

			<div> 
			{
			//	(btnShowValue=="Hide comments" && comments.length>0)?
				(comments.length>0)?
				comments.sort((a,b) => {
			        if (a.date < b.date)
			          return 1
			        if (a.date > b.date)
			          return -1
			        return 0
	  				}).map( comment => (<Comment commentId={comment.commentId} author={comment.author}
					date={comment.date} text={comment.text}/>) 
					) 
	          	:''
			}
			</div>
		</div>
	</div>
)

export default connect(
	(state) => {
		const btnShowValue=state.articleReducer.btnShowValue
		console.log(btnShowValue)
		return {
		  btnShowValue
		}
	}
)(Article)

