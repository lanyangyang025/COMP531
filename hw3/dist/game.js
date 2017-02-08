var set_easy=10; //the picture kinds in easy mode
var set_medium=15; //the picture kinds in medium mode
var set_hard=20; //the picture kinds in hard mode
var set;
var total_time=curr_time=900  //900 is the length of the progress bar
var time_display;
var display_cycle;
var score;

//time progress bar
var time_interval=function(){
	var bar=document.getElementById("progressbar");
	var bar_text=document.getElementById("bar_text");
	bar_text.innerHTML=curr_time/5-1;  //the total time is 900/5=180s
	display_cycle=5;  //200*5=1000ms
	time_display = setInterval(function(){	
		if(display_cycle!==0){
			display_cycle--;
		}else{
			bar_text.innerHTML=curr_time/5-1;
			display_cycle=4;
		}	
		bar.style.width=(curr_time-1)+'px';	
		curr_time=curr_time-1;
		//couldn't complete the game within 180 seconds
		if(curr_time==0){
			alert("Game Over!")
			var temp=parseInt(get_cookie()[2])+1;
			document.cookie="fail="+temp;
			Restart();
		};
	}, 200); 
}

//reset the game
function Reset(){
	if(score>get_cookie()[0] && score!=999999){
		document.cookie="max_score="+score;	
		document.getElementById("highestscore").innerHTML=score;		
	}
	document.getElementById("start").disabled = false;
	document.getElementById("exit").disabled = true;
	document.getElementById("select_bar").disabled=false;
	document.getElementById("reset_cookie").disabled=false;	
	document.getElementById("pieces").innerHTML = "";
	clearInterval(time_display);
	document.getElementById("progressbar").style.width='900px';	
	document.getElementById("bar_text").innerHTML=0;
	document.getElementById("score").innerHTML = 0;
	get_path_x=[];
	get_path_y=[];
	curr_time=900;
	score=0;
}

//exit the game and the failure time + 1
function Exit(){
	if(confirm("Are you sure to exit the game?")){
		var temp=parseInt(get_cookie()[2])+1;
		document.cookie="fail="+temp; 
		Reset();
	}
}

//show record
function Record(){
	alert("success="+get_cookie()[1]+", fail="+get_cookie()[2]);
}

//clear record
function Reset_cookie(){
	document.cookie="max_score="+0;
	document.cookie="success="+0;
	document.cookie="fail="+0;
	document.getElementById("highestscore").innerHTML=0;
}

//restart the game
function Restart(){
	if(confirm("Are you sure to start the game again?")){
		clearInterval(time_display);
		document.getElementById("progressbar").style.width='900px';	
		document.getElementById("pieces").innerHTML = "";
		document.getElementById("score").innerHTML = 0;

		if(score>get_cookie()[0] && score!=999999){
			document.cookie="max_score="+score;	
			document.getElementById("highestscore").innerHTML=score;		
		}
		display_cycle=5;
		curr_time=900;
		get_path_x=[];
		get_path_y=[];
		score=0;
		func_start();
	}else{
		Reset();
	}
}

//set difficulty of the game
var difficulty=function(){
	var obj = document.getElementById("select_bar");
	var index = obj.selectedIndex; 
	var value = obj.options[index].value;
	if(value=="easy"){
		set=set_easy;
	}else if(value=="medium"){
		set=set_medium;
	}else{
		set=set_hard;
	}
}

//shuffle the image set when the game starts
var func_shuffle=function(set){
	var len=set.length;
	for(var i=0;i<len-1;i++){
		var index=Math.floor(Math.random()*(set.length-i))
		var temp=set[index];
		set[index]=set[len-i-1];
		set[len-i-1]=temp;
	}
	return set;
}

//if the shift key is pressed while the page is clicked, you win the game.
//the score is 999999, but it's not recorded.
function isKeyPressed(event){ 
	if(event.shiftKey){
		score=999999;
		var temp=parseInt(get_cookie()[1])+1;
		document.cookie="success="+temp;
		document.getElementById("score").innerHTML = score;
		setTimeout(function(){
			alert("You win!! Your score is "+score+" !!");
			Restart();	
			delete_track();				
		},10)		
	}	
} 

//get record from cookie
function get_cookie(){
	var temp=[];
	//if cookie has "max_score", then push it to temp, otherwise push 0 to temp
	if(document.cookie.indexOf("max_score")<0){
		temp[0]=0;
	}else{
		var arr=document.cookie.split(";");
		arr.forEach(function(e,index){
			if(e.indexOf("max_score")>=0){
				var arr1=e.split("=")	
				temp[0]=arr1[1]	
			}
		})
	}
	//if cookie has "success", then push it to temp, otherwise push 0 to temp
	if(document.cookie.indexOf("success")<0){
		temp[1]=0;
	}else{
		var arr=document.cookie.split(";");
		arr.forEach(function(e,index){
			if(e.indexOf("success")>=0){
				var arr1=e.split("=")	
				temp[1]=arr1[1]	
			}
		})
	}
	//if cookie has "fail", then push it to temp, otherwise push 0 to temp
	if(document.cookie.indexOf("fail")<0){
		temp[2]=0;
	}else{
		var arr=document.cookie.split(";");
		arr.forEach(function(e,index){
			if(e.indexOf("fail")>=0){
				var arr1=e.split("=")	
				temp[2]=arr1[1]	
			}
		})
	}
	return temp
}

window.onload=function(){
	score=0;	
	document.getElementById("highestscore").innerHTML=get_cookie()[0];
	document.getElementById("score").innerHTML = 0;
	document.getElementById("start").onclick=func_start;
	document.getElementById("start").disabled=false;
	document.getElementById("exit").disabled=true;	
	document.getElementById("select_bar").disabled=false;
	document.getElementById("reset_cookie").disabled=false;		
}


