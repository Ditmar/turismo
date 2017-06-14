Template.loginForm.onRendered(function () {
	self = this;
	this.datos = new ReactiveVar();
$.getScript("//connect.facebook.net/en_US/sdk.js", function(){
    	  
    	 	window.fbAsyncInit = function() {
    		FB.init({
      			appId      : '1099767406791159',
      			cookie     : true,
      			xfbml      : true,
      			version    : 'v2.8'
    		});
    		FB.AppEvents.logPageView();   
  			// estamos verificando el status de facebook
  			//checkLoggin();
  				/*FB.login(function(r){
  					console.log("->")
  					console.log(r);
  					testAPI();
  				},{scope: 'email'});*/
  			};
  			function createAccount(user){
     	 					Accounts.createUser(user, function(e){
								if(e == undefined) {
								$(".panelForm").css("opacity",0);				
									// al servidor
									Meteor.loginWithPassword(user.username,user.password);	
								}
							});
  			}
  			function testAPI() {
    			console.log('Welcome!  Fetching your information.... ');
   	 			var datosfacebook = [];
   	 			FB.api('/me/?fields=email', function(response) {
     	 			datosfacebook.push(response);
     	 			FB.api("/me",function(r){
     	 				datosfacebook.push(r);
     	 				FB.api("/me/picture",function(r){
     	 					datosfacebook.push(r);
     	 					Meteor.call("checkAccount",datosfacebook[1].name, function(err,r){
     	 						if(!r){
     	 							var user = {
										"username" : datosfacebook[1].name,
										"email" : datosfacebook[0].email,
										"password" : datosfacebook[0].id,
										"profile" : {
											"country" :"Bolivia"
										}
								};
									//console.log(user);
     	 							createAccount(user);
     	 						}else{
     	 							Meteor.loginWithPassword(datosfacebook[1].name,datosfacebook[0].id);
     	 						}
     	 					})
     	 					
     	 					console.log(datosfacebook);
     	 				});
     	 			});
     	 			//console.log('Successful login for: ' + response.name);
     	 			//console.log(response);
      			});
  			}
  			checkLoggin =()=>{

  				FB.getLoginStatus(function(response) {
  					if(response.status == "connected") {
     	 				testAPI();
     	 			}
  					console.log(response);
   				 //statusChangeCallback(response);
				});	
  			}
    });
});
Template.loginForm.events({
	"click #registerbtn" : function(e){
		e.preventDefault();
		myTemplates.set("registerForm");
	},
	"click #close" : function(e){
		e.preventDefault();
		$(".panelForm").css("opacity",0);
	},
	"submit form" : function(e){
		//SERVIDOR
		Meteor.loginWithPassword(e.target.email.value,e.target.password.value);
		$(".panelForm").css("opacity",0);
		return false;
	}
});
