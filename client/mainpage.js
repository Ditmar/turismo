BUTTONFACEBOOK = new ReactiveVar(false);
Template.mainpage.onRendered(function(){
	$('.button-collapse').sideNav();
    $('.parallax').parallax();
    $(".panelForm").css("opacity",0);
});
Template.mainpage.helpers({
	facebook: function(){
		return BUTTONFACEBOOK.get();
	},
	username : function(){
		return Accounts.user().username;
	}
})

Template.mainpage.events({
	"click #login" : function(){
		$(".panelForm").css("opacity",1);
	},
	"click #logout" : function(){
		Meteor.logout();
	}
})