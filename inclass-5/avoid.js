function butt_click(){
	var button2= document.getElementById("button1");
	var succ=document.getElementById("success");
	if(button2.innerHTML=='Click Me!'){
		button2.innerHTML='Play Again!';	
		succ.style.display="block";
	}
	else{
		button2.innerHTML='Click Me!';
		succ.style.display="None";
		butt_move();
	}
}


function butt_move(){
	var button2= document.getElementById("button1");
	if(!event.shiftKey && button2.innerHTML=='Click Me!'){
		button2.style.top=Math.random()*(window.innerHeight-button2.style.height)+'px';
		button2.style.left=Math.random()*(window.innerWidth-button2.style.width)+'px';
	}
}