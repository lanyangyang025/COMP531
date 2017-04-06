import React from 'react'
import { connect } from 'react-redux'

import { Comment } from './comment'
import { AddComment } from './addComment'
import { searchKeyword,showComments,addArticle,addComments,editPost } from './articleActions'

//content of a card
export const Article = ({ count, article, _id, author, date, text, img, comments, dispatch, username}) => {
let word;
return(
	<div name="all_articles" className="panel panel-default text-left">
        <div className="panel-body">
			<div className="col-sm-3">
	          	<div className="well">
				<p><span>{date}, {author}:</span></p>
				</div>
	      	</div>

	      	<div className="col-sm-9">
	        	<p><img src={img} id="december18" className="ys"></img></p>
	        	{
		      		(author==username)?
		      		<div>
		      			<textarea id={'edit_post'+count} name='edit_article' className="form-control col-sm-12" rows="6" value={text} ref={ (node) => { word = node }} 
		      			onChange={()=>{dispatch(editPost(word.value, article))}}></textarea>
				    </div>
				    
				    :<div><p>{text}</p></div>
		    	}
		    	<div>
		        	<input type="button" className="btn btn-primary btn-sm" id={'showComment'} value={article.displayComment?'Hide Comments':'Show Comments'} 
		        	onClick={() => dispatch(showComments(article))}></input>

		        	<input type="button" className="btn btn-primary btn-sm" id={'addComment'} value={article.displayaddComment?'Cancel a Comment':'Add a Comment'} 
		        	onClick={() => {dispatch(addComments(article))}}></input>
		        </div>
	     	</div>

			<div> 
			{
				
				(article.displayaddComment==true)?
					<AddComment article={article} dispatch={dispatch}/>
				:''
	          	
			}
			</div>

			<div> 
			{
				
				(article.displayComment==true && comments.length>0)?
				comments.sort((a,b) => {
			        if (a.date < b.date)
			          return 1;
			        if (a.date > b.date)
			          return -1;
			        return 0
	  				}).map( comment => (<Comment commentId={comment.commentId} key={comment.commentId} author={comment.author}
					date={comment.date} text={comment.text} username={username} comment={comment} dispatch={dispatch} article={article}/>) 
					) 
	          	:''
	          	
			}
			</div>
		</div>
	</div>
	)
}

export default connect()(Article)

