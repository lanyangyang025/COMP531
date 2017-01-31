// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
// Note that during the validation of the tests the browser will be
// directed to download invalid URLs which will result in error messages
// in the console:
//     GET https://webdev-dummy.herokuapp.com/badURL 404 (Not Found)
// this is expected and is not an error with your code.
//
(function(exports) {

    'use strict'
    

    function countWords(url) {
        // IMPLEMENT ME
        return fetch(url)
            .then(res => res.json())
            .then(         	
            	res => {
            		var count_word={}
	            	res.articles.forEach(function(art,index){
	        		var words = art['text'];
	        		count_word[art['_id']]=words.length;
            		},{})
	            	return count_word
            	}) 
    }

    function countWordsSafe(url) {
        // IMPLEMENT ME
        return fetch(url)
            .then(res => res.json())
            .then(         	
            	res => {
            		var count_word={}
	            	res.articles.forEach(function(art,index){
	        		var words = art['text'];
	        		count_word[art['_id']]=words.length;
            		},{})
	            	return count_word
            	}) 
        	.catch(e => ({}));
    }

    function getLargest(url) {
        // IMPLEMENT ME
        var num_max = 0;
        var max_id
        return fetch(url)
            .then(res => res.json())
            .then(         	
            	res => {
	            	res.articles.forEach(function(art,index){
	        		var words = art['text'];
	        		if(num_max<words.length){
	        			num_max=words.length;
	        			max_id=art['_id'];
	        		}
            	},{})
	            return max_id
            }) 

    }

    exports.inclass = {
        author: 'Yiqing Lu',
        countWords, countWordsSafe, getLargest
    }

})(this);
