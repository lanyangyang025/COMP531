//start the game
var func_start=function(){
	var temp_set=[];
	var final_set=[];
	difficulty();  //choose difficulty

	//14*8 is the number of the pieces, so randomly select 14*8/2 images and then duplicate them. 
	for (var i=0;i<14*8/2;i++){
		var temp=Math.ceil(Math.random()*set)
		temp_set.push(temp);		
	}
	temp_set=temp_set.concat(temp_set);

	final_set=func_shuffle(temp_set); //shuffle the image set.
	var img=[];
	var temp=[];
	var timer1=[];
	var e1=[];
	var success=0;  //record how many pieces deleted
	get_way_init();
	final_set.forEach(function(e,index){
		img[index] = new Image();
		img[index].src="img/pieces/"+e+".jpg";
		img[index].id="piece";
		var i=0;	
		var timer;
		img[index].onclick=function(){
			//set flash if no piece was clicked
			if(temp.length==0){
				img[index].src="img/flash.png";
				timer = setInterval(function(){
					img[index].src=(i++)%2==0?"img/pieces/"+e+".jpg":"img/flash.png";				
				},350);	  
				e1.push(e);
				temp.push(index);
				timer1.push(timer);
			}
			//set flash if the piece is clicked again
			else if(temp[0]==index){
				clearInterval(timer);
				img[index].src="img/pieces/"+e+".jpg";	
				e1=[];
				temp=[];
				timer1=[];
			}
			//two images match, then get the way and delete them.
			else if(e1[0]==e && match(temp[0],index)){
				time_track();
				clearInterval(timer1[0]);
				img[temp[0]].src="";
				img[index].src="";
				img[temp[0]].onclick=false;
				img[index].onclick=false;
				get_way(temp[0],index)
				e1=[];
				temp=[];
				timer1=[];
				success++;	
				score=score+100;	
				document.getElementById("score").innerHTML = score;	
			}
			//set flash if two pieces don't match
			else if(e1[0]==e && !match(temp[0],index)){
				clearInterval(timer1[0]);
				img[temp[0]].src="img/pieces/"+e+".jpg";
				e1=[];
				temp=[];
				timer1=[];
			}
			//set flash if another piece is clicked
			else{
				clearInterval(timer1[0]);
				img[temp[0]].src="img/pieces/"+e1[0]+".jpg";
				e1=[];
				temp=[];
				timer1=[];
				img[index].src="img/flash.png";
				timer = setInterval(function(){
					img[index].src=(i++)%2==0?"img/pieces/"+e+".jpg":"img/flash.png";				
				},350);	

				timer1.push(timer);
				temp.push(index);
				e1.push(e);
			}
			if(success==8*14/2){
				score=score+Math.ceil(curr_time/9*50); //the score should also add the score related to the time we use
				document.getElementById("score").innerHTML = score;
				//get max score
				if(score>get_cookie()){
					document.cookie="max_score="+score;	
					document.getElementById("highestscore").innerHTML=score;
					var temp1=parseInt(get_cookie()[1])+1;
					document.cookie="success="+temp1		
				}

				var temp2=parseInt(get_cookie()[1])+1;
				document.cookie="success="+temp2;
				setTimeout(function(){
					alert("You win!! Your score is "+score+" !!");
					Restart();
					delete_track();					
				},10)
			}		
		}			
		document.getElementById("pieces").appendChild(img[index]);
	})
	document.getElementById("start").disabled=true;
	document.getElementById("exit").disabled=false;
	document.getElementById("select_bar").disabled=true;
	document.getElementById("reset_cookie").disabled=true;	
	time_interval();
}