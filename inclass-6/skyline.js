'use strict'
var build_x=[];
var build_width=[];
var build_height=[];
var build_color=[];
var blgColors = [ 'red', 'blue', 'gray', 'orange']
var windowSpacing = 2, floorSpacing = 3
var windowHeight = 5, windowWidth = 3
var addheight= 10
var imagedata=[]
var floor=700*0.8;
var width1=1280;


var createApp = function(canvas) { 
	var c = canvas.getContext("2d");
	// Create the ground
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)


	var build = function() { 
		var x0 = Math.random()*(canvas.width-1)+1
		var blgWidth = (windowWidth+windowSpacing) * Math.floor((Math.random()*7)+3)*2
		var blgHeight = Math.random()*canvas.height*2/3
		var color_choose=Math.floor(Math.random()*blgColors.length)

		model(x0,blgWidth,blgHeight,color_choose,canvas)

		build_x=build_x.concat(x0)
		build_width=build_width.concat(blgWidth)
		build_height=build_height.concat(blgHeight)
		build_color=build_color.concat(color_choose)

		imagedata=imagedata.concat(c.getImageData(x0, floor-blgHeight, blgWidth, blgHeight));
	}
	
	return {
		build: build
	}
}


function model(axis_x,width,height,color,canvas){
	var c = canvas.getContext("2d");
	c.fillStyle= blgColors[color];
	c.fillRect(axis_x, floor -height, width, height)
}

function light(axis_x,width,height,canvas){
	var c = canvas.getContext("2d");
	for (var y = floor - floorSpacing; y > floor - height; y -= floorSpacing + windowHeight) {
		for (var x = windowSpacing; x < width - windowWidth; x += windowSpacing + windowWidth) {
			if(Math.round(Math.random())){
				c.fillStyle="yellow"
			}else{
				c.fillStyle= "black";
			}
			c.fillRect(axis_x + x, y - windowHeight, windowWidth, windowHeight)
		}
	}
}


window.onload = function() {
	var canvas=document.getElementById("myCanvas")
	var app= createApp(canvas)
	document.getElementById("myBuild").onclick = app.build
	init(canvas);
	canvas.addEventListener("click", function(e) {
		var x1 = e.clientX-this.offsetLeft;
		var y1 = e.clientY-this.offsetTop;
		for(var i=0;i<build_x.length;i++){
			if(x1>=build_x[i] && x1<=build_x[i]+build_width[i]){
				if(y1>=floor-build_height[i] && y1<=floor){
					build_height[i]=build_height[i]+addheight;
					model(build_x[i],build_width[i],build_height[i],build_color[i],canvas);
					var c = canvas.getContext("2d");
					imagedata[i]=c.getImageData(build_x[i], floor-build_height[i], build_width[i],build_height[i]);
				}
			}
		}
	}, true)	
}


function Stage (ctx) {
    this.ctx = ctx;
  	this.displayObjects = [];
}


Stage.prototype.add = function (displayObject) {
    this.displayObjects.push(displayObject);
};

Stage.prototype.render = function (canvas) {
    var displayObjects = this.displayObjects;
  	var ctx = this.ctx;
  
    function loop () {
		ctx.clearRect(0, 0, width1, floor);

		imagedata.forEach(function(e,index){
			ctx.putImageData(e, build_x[index], floor-build_height[index])
			light(build_x[index],build_width[index],build_height[index],canvas)
		})
		displayObjects.forEach(function (displayObject) {
		  displayObject.update(ctx);
		});

		requestAnimationFrame(loop);
	} 
    loop();
};

function Circle (x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}

function Rect(x,y){
	this.x=x;
	this.y=y;
}

Circle.prototype.update = function (ctx) {
    fillcircle(this.x, this.y, this.r, "#FFCC33", ctx)
};


function fillcircle(x,y,r,color, ctx){
    ctx.beginPath();
    ctx.fillStyle=color;
    console.log(x)
    ctx.arc(x,y,r,0, 2*Math.PI, false);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();	
}

function fillrect(x,y,width,height,color,ctx){
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.rect(x,y,width,height);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();	
}


Rect.prototype.update = function (ctx) {
	fillrect(this.x, this.y,60,43,"#00cc00",ctx);
	fillrect(this.x+10, this.y+10,15,15,"white",ctx);
	fillrect(this.x+35, this.y+10,15,15,"white",ctx);
    fillcircle(this.x+17.5,this.y+43,7,"#777777",ctx);
    fillcircle(this.x+42.5,this.y+43,7,"#777777",ctx);
};




var stage;
var n=Math.PI;

function init (canvas) {
	var ctx = canvas.getContext('2d');
  
	var circ = new Circle(-30, 300, 30);
  	var rect = new Rect(-60,floor-50);

  	stage = new Stage(ctx);

  	stage.add(circ);
  	stage.add(rect);
  	stage.render(canvas);
  
	setInterval(function () {
	  	sun_move(circ);
	  	rect_move(rect);
	}, 100)
}

function sun_move(circ){
	if(n>=2*Math.PI){
		circ.x = -30;
	    circ.y = 300;
	    n=Math.PI;
  	}else{
	    circ.x = 670*Math.cos(n)+640;
	    circ.y = 270*Math.sin(n)+300;
	    n=n+0.02;
	} 
}

function rect_move(rect){
	rect.x=rect.x%1280;
	rect.x=rect.x+20;
}
