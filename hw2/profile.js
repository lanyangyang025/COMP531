//insert elements to the page.
function insert(id_init,title,display,innervalue){
	var div=document.createElement("DIV");
	div.id=id_init;
	div.innerHTML=title;
	var input_box=document.createElement("input");
	if(id_init!="password" && id_init!="confirm"){
		input_box.type="text";
	}else{
		input_box.type="password";
	}
	input_box.placeholder=display;
	div.appendChild(input_box);
	var label=document.createElement("label");
	label.id="show";
	label.innerHTML=innervalue;
	div.appendChild(label);
	var span=document.createElement("span");
	span.id="span";
	div.appendChild(span);
	document.body.appendChild(div);
}

//check whether the input satisfies the pattern
function check(){
	var divs = Array.prototype.slice.call(document.getElementsByTagName("div"));
    divs.forEach(function(e){
    	document.getElementById(e.id).getElementsByTagName("span")[0].innerHTML="";
    	//the password and the confirm are not included since they have to be matched and the function is different.
    	if(e.id!="password" && e.id!="confirm"){
	    	if(document.getElementById(e.id).getElementsByTagName("input")[0].value){
	    		var pattern=setpattern(e.id);
	    		update(e,pattern);
	    	}
	    }
    },divs.length)
    pass_valid();
}

//check password validation
function pass_valid(){
	var pass=document.getElementById("password");
	var verify=document.getElementById("confirm");
	if(pass.getElementsByTagName("input")[0].value || verify.getElementsByTagName("input")[0].value){
		//show warning if the password isn't match the confirm password
		if(pass.getElementsByTagName("input")[0].value!==verify.getElementsByTagName("input")[0].value){
			pass.getElementsByTagName("span")[0].innerHTML="Password and password confirmation have to match";
			verify.getElementsByTagName("span")[0].innerHTML="Password and password confirmation have to match";
		}else{
			//update the value
			pass.getElementsByTagName("label")[0].innerHTML=pass.getElementsByTagName("input")[0].value;
			verify.getElementsByTagName("label")[0].innerHTML=verify.getElementsByTagName("input")[0].value;
			//show the change
			pass.getElementsByTagName("span")[0].innerHTML="You change the password from "
			+pass.getElementsByTagName("label")[0].innerText+" to "+pass.getElementsByTagName("input")[0].value;
			verify.getElementsByTagName("span")[0].innerHTML="You change the password from "
			+verify.getElementsByTagName("label")[0].innerText+" to "+verify.getElementsByTagName("input")[0].value;
			//clear the input
			pass.getElementsByTagName("input")[0].value="";			
			verify.getElementsByTagName("input")[0].value="";
		}
	}
}

//set pattern
function setpattern(id){
	var pattern;
	if(id==="e-mail"){
		pattern=/^\w+@\w+.[A-Za-z0-9]+$/;
	}else if(id==="phone"){
		pattern=/^\d\d\d-\d\d\d-\d\d\d\d$/;
	}else if(id==="zipcode"){
		pattern=/^\d{5}$/;
	}else{
		pattern=/^\w+$/;
	}	
	return pattern;	
}

//check the pattern and update the value if it's right.
function update(div,pattern){
	var id_get=document.getElementById(div.id);
	if(!pattern.test(id_get.getElementsByTagName("input")[0].value)){
		//show warning if the pattern is wrong
		id_get.getElementsByTagName("span")[0].innerHTML=warning[init_id.indexOf(div.id)];
	}else{
		//show the change
		id_get.getElementsByTagName("span")[0].innerHTML="You change the "
		+display[init_id.indexOf(div.id)]+" from "+id_get.getElementsByTagName("label")[0].innerText+" to "
		+id_get.getElementsByTagName("input")[0].value;
		//update the value
		id_get.getElementsByTagName("label")[0].innerHTML=id_get.getElementsByTagName("input")[0].value;
		//clear the value in the input
		id_get.getElementsByTagName("input")[0].value="";
	}
	
}	

//initial values
var init_id=["display", "e-mail", "phone","zipcode", "password", "confirm"];
var title=["Display Name: ", "Email Address: ", "Phone Number: ", "Zip Code: ", "Password: ", "Confirm Password: "]
var display=["Display Name", "Email Address", "Phone Number", "Zip Code", "Password", "Confirm Password"]
var innervalue=["Yiqing Lu", "yl128@rice.edu", "123-123-1234", "77005", "password1", "password1"];
var warning=["","The e-mail address format is be a@b.c, c doesn't include  _ (underscore) character.",
"Phone format is XXX-XXX-XXXX","Zipcode format is XXXXX","",""];



window.onload=function(){

	for(var i=0; i<init_id.length; i++){
		insert(init_id[i], title[i], display[i], innervalue[i]);
	}
};