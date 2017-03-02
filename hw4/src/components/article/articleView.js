import React from 'react'
import { connect } from 'react-redux'

import {Article}  from './article'
import { searchKeyword } from './articleActions'


const articlesInfo = require('./articles.json')
let articles1 = articlesInfo.articles
const articles_org=Object.keys(articles1).map((id) => articles1[id])
var articles=articles_org

const ArticleView = ({dispatch}) => {
let keyword
return(
	<div className="row">
        <div className="col-sm-8">
			<div className="col-sm-11">
				<input className="form-control" type="search" placeholder="search here"
				ref={ (node) => { keyword = node }}/>
			</div>
			<button type="button" className="btn btn-primary btn-sm" onClick={() => { dispatch(searchKeyword(keyword.value)) }}>Search</button>
        </div>

	    <div className="col-sm-8">
	        <div className="panel panel-default text-left">
	            <div className="panel-body">
                	<div className="form-group col-sm-12">
                        <textarea className="form-control" id="post" rows="4" placeholder="share..."></textarea><br/>
                        <input type="file" className="form-control" id="uploadPhoto"  name="upload a photo"/>
                    </div>
                    <button className="btn btn-primary btn-sm col-sm-offset-4">{' Post '}</button>
                    <button className="btn btn-primary btn-sm col-sm-offset-3" onClick={()=>{document.getElementById('post').value=''}}>Cancel</button>		                    
	            </div>
	        </div>
	    </div>

		<div className="col-sm-8 row">
			<div className="panel panel-default text-left">
		        <div className="panel-body">
				{ 
					articles.sort((a,b) => {
				        if (a.date < b.date)
				          return 1
				        if (a.date > b.date)
				          return -1
				        return 0
		  				}).map( article => <Article _id={article._id} author={article.author}
				date={article.date} text={article.text} img={article.img} 
				comments={article.comments}/> )
				} 
				</div>
			</div>   
		</div>
	</div>
)
};

export default connect(
  (state) => {
    const keyword = state.articleReducer.searchKeyword
    articles=articles_org
    if (keyword && keyword.length > 0) {
      articles=articles.filter((a) => {
        return a.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
               a.author.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
      })
    }
    return {
      articles
    }
  }
)(ArticleView)