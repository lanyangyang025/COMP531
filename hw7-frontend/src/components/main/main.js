import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Headline from './headline'
import Following from './following'
import Nav from './nav'
import ArticleView from '../article/articleView'

//content of the main page
const Main = () => (
    <div>
        <Nav/>

        <div className="container-fluid text-center">
            <div className="row">
                <div className="col-sm-2 well col-sm-offset-1">
                    <div>
                        <label id="panel-heading text-center"><font size="5">About me</font></label>
                    </div>
                    <Headline/>
                    <div>
                        <label id="panel-heading text-center"><font size="5">Followers</font></label>
                    </div>
                    <Following/>

                </div>
                   <ArticleView />
                </div>

        </div>
        
        <footer className="container-fluid text-center">
            <p>RiceBook © 2017</p>
            <p>Contact: yl128@rice.edu</p>
        </footer>
    </div>
)

export default connect()(Main);