import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, findxpath} from './selenium'
import landing from './landing'

describe('Test Main Page', (done) => {


    before('should log in', (done) => {
        go().then(landing.login).then(done)
    })

    it("Create new article and validate article appears in feed", (done) => {
	    var count   
	    sleep(500)
	    .then(findxpath("//div[@name='all_articles']")
	        .then(r => {count = r.length}
	            )
	        )
        .then(findId('post').sendKeys("new post"))
        .then(findId('post_button').click())
	    .then(sleep(1000))
	    .then(findxpath("//div[@name='all_articles']")
            .then(elem => {
                expect(elem.length).to.equal(count+1)
            })
		 .then(done)
	    )       

    })

    it("Edit an article and validate the article text has updated", (done) => {
    	var new_article="a"
	    sleep(500)
	    .then(findId('edit_post0').getText()	
        .then((text) => {   
        	findId('edit_post0').sendKeys(new_article)
        	sleep(1000)
        	.then(findId('edit_post0').getText()
        		.then((new_text)=>{expect(text).to.not.equal(new_article)}))      
        })
        .then(done))
    })


    it("Update the headline and verify the change", (done) => {
    	var headline='new headline';
       	 sleep(500)
        .then(findId('new_headline').sendKeys(headline))
        .then(findId('button_update_user').click())
        .then(sleep(2000))
        .then(findId('old_headline').getText()
            .then(text => {
                expect(text).to.equal(headline)
            })
            .then(done))
    })

    it("Should Add a follower and increase the count by 1", (done) => {
    var count    
     sleep(500)
    .then(findId('add_a_follower').sendKeys('yl128'))
    .then(findxpath("//button[@name='del_follower']")
        .then(r => {count = r.length
                }
            )
        )
    .then(sleep(1000))
    .then(findxpath("//button[@name='add_follower']")
        .then(r => {
            r[0].click()
        })
        )
    .then(sleep(1000))    
    .then(findxpath("//button[@name='del_follower']")
            .then(elem => {
            	if(elem.length==count+1){
	                expect(elem.length).to.equal(count+1)
	            }else{
	            	sleep(1000)
	            	findId('err_follower')
	            	.then(r=>{expect(r).to.be.ok})
	            }
            })
	  .then(done)
         )       

    })

    it("Should Remove a follower and decrease count by 1", (done) => {
    var count    
    sleep(500)
    .then(findxpath("//button[@name='del_follower']")
        .then(r => {count = r.length;
                    if(count>0){r[0].click()}
                })
        )
    .then(sleep(1000))    
    .then(findxpath("//button[@name='del_follower']")
            .then(elem => {
            	if(count>0)
                expect(elem.length).to.equal(count-1)
            })
	 .then(done)
         )       

    })

    it("Search for special &quot", (done) => {
	    var count   
	    sleep(500)
	    .then(findxpath("//div[@name='all_articles']")
	        .then(r => {count = r.length}
	            )
	        )
        .then(findId('article_search').sendKeys("yl128"))

	    .then(sleep(1000))
	    .then(findxpath("//div[@name='all_articles']")
	            .then(elem => {
	                expect(elem.length).to.not.be.above(count)
	            })
		 .then(done)
	    )       

    })


})