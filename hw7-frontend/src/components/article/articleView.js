import React from 'react'
import { connect } from 'react-redux'

import {Article}  from './article'
import { searchKeyword,showComments,addArticle } from './articleActions'

//the content of all the articles
const ArticleView = ({articles,dispatch, username}) => {
let keyword, text, newImage, count=0
return(
	<div className="row">
	    <div className="col-sm-8">
	        <div className="panel panel-default text-left">
	            <div className="panel-body">
	            	<div className="form-group col-sm-12">
	                    <textarea className="form-control" id="post" rows="4" placeholder="share..." ref={ (node) => { text = node }} ></textarea><br/>
						<p><input type="file" id='uploadFile_1' accept="image/*"  onChange={(e) => newImage = e.target.files[0]} /></p>
	                </div>
	                <button id='post_button' className="btn btn-primary btn-sm col-sm-offset-4" onClick={() => {dispatch(addArticle(text.value, newImage));
	                	document.getElementById('post').value=''; document.getElementById('uploadFile_1').value='';}}>{' Post '}</button>
	                <button className="btn btn-primary btn-sm col-sm-offset-3" onClick={()=>{document.getElementById('post').value=''}}>Cancel</button>		                    
	            </div>
	        </div>
	    </div>

        <div className="col-sm-8">
			<div className="col-sm-11">
				<input className="form-control" type="search" placeholder="search here" id="article_search"
				ref={ (node) => { keyword = node }} onChange={() => { dispatch(searchKeyword(keyword.value)) }}/>
			</div>
        </div>

		<div className="col-sm-8 row">
			<div className="panel panel-default text-left">
		        <div className="panel-body">
				{ 
					articles.sort((a,b) => {
				        if (a.date < b.date){
				          return 1
				        }
				        if (a.date > b.date)
				          return -1
				        return 0
		  				}).map( article => <Article count={count++} article={article} _id={article._id} key={article._id} author={article.author}
				date={article.date} text={article.text} img={article.img} 
				comments={article.comments} dispatch={dispatch} username={username}/> )
				} 
				</div>
			</div>   
		</div>

	</div>
)
};

export default connect(
  (state) => {
    const keyword = state.articleReducer.searchKeyword;
    let articles = Object.keys(state.articleReducer.articles).map((id) => state.articleReducer.articles[id]);
    if (keyword && keyword.length > 0) {
      articles=articles.filter((a) => {
        return a.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
               a.author.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
      })
    }
    return {
      articles,
      username: state.profileReducer.username
    }
  }
)(ArticleView)

