Template.registerForm.onRendered(function(){
	$("select").material_select();
});
msn = new ReactiveVar(false);
Template.registerForm.helpers({
	msn: function(){
		
		return msn.get();
	}
})
Template.registerForm.events({
	"click #return" : function(){
		myTemplates.set("loginForm");
	},
	"click #close" : function(){
		$(".panelForm").css("opacity",0);
	},
	"submit form" : function(e,template){
			var userReg = /[a-z0-9]{6,}/i
			var emailReg = /^[a-zA-Z-_0-9.]{1,}@\w{3,}[.][a-zA-Z]{2,3}$/
			var passwordReg = /[\w]{6,}/
			var validate = true;
			template.variable = new ReactiveVar();
			if(!userReg.test(e.target.username.value)){
				//alert("Tu nombre de usuario no cumple los requisitos");
				msn.set("Tu nombre de usuario no cumple los requisitos")
				validate = false;
			}
			if(!emailReg.test(e.target.email.value)){
				alert("Tu email no cumple los requisitos");
				validate = false;
			}
			if(!passwordReg.test(e.target.password.value)){
				alert("Tu password no cumple los requisitos");
				valid = false;
			}
			if(!validate){
				return false;
			}
		var user = {
			"username" : e.target.username.value,
			"email" : e.target.email.value,
			"password" : e.target.password.value,
			"profile" : {
				"country" : e.target.country.value
				}
			};
			/*
			 ESTE CODIGO PERTENCE AL SERVIDOR
			*/

			Accounts.createUser(user, function(e){
				if(e == undefined) {
					$(".panelForm").css("opacity",0);				
					// al servidor
					Meteor.loginWithPassword(user.username,user.password);	
				}
				//
			});
			return false;
	}
})