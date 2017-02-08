var get_path_x=[]
var get_path_y=[]
var track_x=[];
var track_y=[];
var maximum_score;

//the bound is included in the free way
var get_way_init=function(){
	for(var i=0;i<14;i++){
		get_path_x=get_path_x.concat(-1);
		get_path_y=get_path_y.concat(i);
		get_path_x=get_path_x.concat(8);
		get_path_y=get_path_y.concat(i);
	}
	for(var j=0;j<8;j++){
		get_path_x=get_path_x.concat(j);
		get_path_y=get_path_y.concat(-1);
		get_path_x=get_path_x.concat(j);
		get_path_y=get_path_y.concat(14);
	}
}

//draw the track
var draw_track=function(){
	track_x.forEach(function(e,index){
		piece_track = document.createElement("div"); 
		piece_track.className = "track"; 
		piece_track.style.left=50*(track_y[index]+1)+"px";	
		piece_track.style.top=50*(e+1)+"px";
		piece_track.style.position="absolute";
		document.getElementById("piece_border").appendChild(piece_track); 		
	})
}

//delete the track
var delete_track=function(){
	document.getElementById("piece_border").innerHTML="";
}

//the track is shown in 200ms
var time_track=function(){
	draw_track();
	setTimeout(function(){
		delete_track();
	},200)	
}

//get the start point and the end point
var get_way=function(piece_1,piece_2){
	get_path_x=get_path_x.concat(parseInt(piece_1/14));
	get_path_y=get_path_y.concat(piece_1%14);
	get_path_x=get_path_x.concat(parseInt(piece_2/14));
	get_path_y=get_path_y.concat(piece_2%14);
}

//show whether the two pieces match
var match=function(piece_1,piece_2){
	piece1_x=parseInt(piece_1/14);
	piece1_y=piece_1%14;
	piece2_x=parseInt(piece_2/14);
	piece2_y=piece_2%14;
	track_x=[piece1_x,piece2_x];
	track_y=[piece1_y,piece2_y];
	var result1=no_turn(piece1_x,piece1_y,piece2_x,piece2_y); //can access to each other without any turn
	if(result1){
		return result1
	}  
	var result2=one_turn(piece1_x,piece1_y,piece2_x,piece2_y); //can access to each other with one turn
	if(result2){
		return result2
	} 
	var result3=two_turns(piece1_x,piece1_y,piece2_x,piece2_y); //can access to each other with two turn
	if(result3){
		return result3
	}
	return false
}

var no_turn=function(piece1_x,piece1_y,piece2_x,piece2_y){
	var count=0;
	// The circumstance that the values in x_axis or thes value in y_axis don't match is unexisted
	if(piece1_x!==piece2_x && piece1_y!==piece2_y){  
		return false;
	}
	//if the number of free blocks==the destance between them, then return true
	else if(piece1_x==piece2_x){
		get_path_y.forEach(function(e,index){
			if(get_path_x[index]==piece1_x && e>Math.min(piece1_y,piece2_y) && e<Math.max(piece1_y,piece2_y)){
				track_y=track_y.concat(e);
				track_x=track_x.concat(piece1_x);
				count++;
			}
		})
		if(count==Math.max(piece1_y,piece2_y)-Math.min(piece1_y,piece2_y)-1){
			return true;
		}else{
			track_x=[piece1_x,piece2_x];
			track_y=[piece1_y,piece2_y];
			return false;
		}
	}else{
		get_path_x.forEach(function(e,index){
			if(get_path_y[index]==piece1_y && e>Math.min(piece1_x,piece2_x) && e<Math.max(piece1_x,piece2_x)){
				track_x=track_x.concat(e);
				track_y=track_y.concat(get_path_y[index]);
				count++;
			}
		})
		if(count==Math.max(piece1_x,piece2_x)-Math.min(piece1_x,piece2_x)-1){
			return true;
		}else{
			return false;
		}
	}
}

var one_turn=function(piece1_x,piece1_y,piece2_x,piece2_y){
	var count1=0,count2=0,count3=0,count4=0;
	var track1_x=[],track1_y=[];
	var track2_x=[],track2_y=[];
	var track3_x=[],track3_y=[];
	var track4_x=[],track4_y=[];
	var delta_x=Math.max(piece1_x,piece2_x)-Math.min(piece1_x,piece2_x); 
	var delta_y=Math.max(piece1_y,piece2_y)-Math.min(piece1_y,piece2_y); 

	//get free blocks in y_axis when x==piece1_x or x==piece2_x
	get_path_y.forEach(function(e,index){
		if(e>Math.min(piece1_y,piece2_y) && e<Math.max(piece1_y,piece2_y)){
			if(piece1_x==get_path_x[index]){
				track1_x=track1_x.concat(piece1_x)
				track1_y=track1_y.concat(e);
				count1++;				
			}else if(piece2_x==get_path_x[index]){
				track2_x=track2_x.concat(piece2_x)
				track2_y=track2_y.concat(e);
				count2++;
			}
		}
	})

	//get free blocks in x_axis when y==piece1_y or y==piece2_y
	get_path_x.forEach(function(e,index){
		if(e>Math.min(piece1_x,piece2_x) && e<Math.max(piece1_x,piece2_x)){
			if(piece1_y==get_path_y[index]){
				track3_x=track3_x.concat(e)
				track3_y=track3_y.concat(piece1_y);
				count3++;			
			}else if(piece2_y==get_path_y[index]){
				track4_x=track4_x.concat(e)
				track4_y=track4_y.concat(piece2_y);
				count4++;

			}
		}
	})

	// see if there is a way that the number of blocks==the x_distance+y_distance between two pieces.
	if(count1+count4==delta_x+delta_y-2){
		track1_x=track1_x.concat(track4_x)
		track1_y=track1_y.concat(track4_y)
		for(var i=0;i<get_path_x.length;i++){
			if((piece1_x)==get_path_x[i] && (piece2_y)==get_path_y[i]){
				track1_x=track1_x.concat(piece1_x)
				track1_y=track1_y.concat(piece2_y)
				track_x=track_x.concat(track1_x)
				track_y=track_y.concat(track1_y)
				return true;	
			}
		}			
	}

	if(count2+count3==delta_x+delta_y-2){
		track2_x=track2_x.concat(track3_x)
		track2_y=track2_y.concat(track3_y)
		for(var i=0;i<get_path_x.length;i++){
			if((piece2_x)==get_path_x[i] && (piece1_y)==get_path_y[i]){
				track2_x=track2_x.concat(piece2_x)
				track2_y=track2_y.concat(piece1_y)
				track_x=track_x.concat(track2_x)
				track_y=track_y.concat(track2_y)
				return true;
			}
		}
	}
	return false;	
}



var two_turns=function(piece1_x,piece1_y,piece2_x,piece2_y){
	var count1=0,count2=0,count3=0,count4=0;
	var track1_temp=[];
	var track2_temp=[];
	var track3_temp=[];
	var track4_temp=[];
	var track1_x=[],track1_y=[];
	var track2_x=[],track2_y=[];
	var track3_x=[],track3_y=[];
	var track4_x=[],track4_y=[];
	var temp;
	//get all the free ways centered at piece1 and piece2
	get_path_x.forEach(function(e,index){
		if(get_path_y[index]==piece1_y){
			track1_temp=track1_temp.concat(e);
		}
		if(get_path_y[index]==piece2_y){
			track2_temp=track2_temp.concat(e);
		}
	})
	temp=piece1_x-1
	while(contain(track1_temp,temp)){
		track1_x=track1_x.concat(temp);
		track1_y=track1_y.concat(piece1_y);
		temp=temp-1;
	}
	temp=piece1_x+1
	while(contain(track1_temp,temp)){
		track1_x=track1_x.concat(temp);
		track1_y=track1_y.concat(piece1_y);
		temp=temp+1;
	}

	temp=piece2_x-1
	while(contain(track2_temp,temp)){
		track2_x=track2_x.concat(temp);
		track2_y=track2_y.concat(piece2_y);
		temp=temp-1;
	}
	temp=piece2_x+1
	while(contain(track2_temp,temp)){
		track2_x=track2_x.concat(temp);
		track2_y=track2_y.concat(piece2_y);
		temp=temp+1;
	}

	get_path_y.forEach(function(e,index){
		if(get_path_x[index]==piece1_x){
			track3_temp=track3_temp.concat(e);
		}
		if(get_path_x[index]==piece2_x){
			track4_temp=track4_temp.concat(e);
		}
	})
	temp=piece1_y-1
	while(contain(track3_temp,temp)){
		track3_x=track3_x.concat(piece1_x);
		track3_y=track3_y.concat(temp);
		temp=temp-1;
	}
	temp=piece1_y+1
	while(contain(track3_temp,temp)){
		track3_x=track3_x.concat(piece1_x);
		track3_y=track3_y.concat(temp);
		temp=temp+1;
	}

	temp=piece2_y-1
	while(contain(track4_temp,temp)){
		track4_x=track4_x.concat(piece2_x);
		track4_y=track4_y.concat(temp);
		temp=temp-1;
	}
	temp=piece2_y+1
	while(contain(track4_temp,temp)){
		track4_x=track4_x.concat(piece2_x);
		track4_y=track4_y.concat(temp);
		temp=temp+1;
	}

	var flag=0;
	//see if two blocks in the free way we get have a no_turn path
	for(var index=0;index<track1_x.length;index++){
		var e=track1_x[index];
		if(contain(track2_x,e)){
			track_x=[piece1_x,piece2_x];
			track_y=[piece1_y,piece2_y];
			var result1=no_turn(e,piece1_y,e,piece2_y)
			if(result1) {
				track1_x.forEach(function(e1){
					if(e1>=Math.min(e,piece1_x) && e1<=Math.max(e,piece1_x)){
						track_x=track_x.concat(e1)
						track_y=track_y.concat(piece1_y)
					}				
				})
				track2_x.forEach(function(e1){
					if(e1>=Math.min(e,piece2_x) && e1<=Math.max(e,piece2_x)){
						track_x=track_x.concat(e1)
						track_y=track_y.concat(piece2_y)
					}				
				})
				flag=1;
				break;
			}
		}
	}
	if(flag!=1){
		for(var index=0;index<track3_y.length;index++){
			var e=track3_y[index];
			if(contain(track4_y,e)){
				track_x=[piece1_x,piece2_x];
				track_y=[piece1_y,piece2_y];
				var result2=no_turn(piece1_x,e,piece2_x,e)
				if (result2) {
					track3_y.forEach(function(e1){
						if(e1>=Math.min(e,piece1_y) && e1<=Math.max(e,piece1_y)){
							track_x=track_x.concat(piece1_x)
							track_y=track_y.concat(e1)
						}				
					})
					track4_y.forEach(function(e1){
						if(e1>=Math.min(e,piece2_y) && e1<=Math.max(e,piece2_y)){
							track_x=track_x.concat(piece2_x)
							track_y=track_y.concat(e1)
						}				
					})
					flag=1
					break;
				};
			}
		}
	}
	if(flag==1) {
		return true;
	}
	return false;
}

var contain=function(arr,num){
	if(arr.indexOf(num)>=0) return true;
	else return false;
}