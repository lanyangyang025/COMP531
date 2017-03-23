import React from 'react'
import { connect } from 'react-redux'

import { Comment } from './comment'

//content of a card
export const Article = ({ _id, author, date, text, img, comments, visible}) => (
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
	     	</div>

			<div> 
			{
				
				(visible=="Hide comments" && comments.length>0)?
				comments.sort((a,b) => {
			        if (a.date < b.date)
			          return 1;
			        if (a.date > b.date)
			          return -1;
			        return 0
	  				}).map( comment => (<Comment commentId={comment.commentId} key={comment.commentId} author={comment.author}
					date={comment.date} text={comment.text}/>) 
					) 
	          	:''
	          	
			}
			</div>
		</div>
	</div>
)

export default connect()(Article)

