import React from 'react'
import { connect } from 'react-redux'

export const Comment = ( {date, author, text} ) => (
	<div className="col-sm-9 col-sm-offset-3">
	  	<div className="well">
	      	<p><span>On {date}, {author} commented:</span></p>
	      	<p>{text}</p>
		</div>
	</div>
)

export default connect()(Comment);

