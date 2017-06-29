
BUTTONFACEBOOK = new ReactiveVar(false);
Template.mainpage.onRendered(function(){
	$('.button-collapse').sideNav();
    $('.parallax').parallax();
    $(".panelForm").css("opacity",0);
});
function listObjects(item) {
	item.coments = CHAT.find({idSource : item._id}).fetch().length;	
	return item;
}
Template.mainpage.helpers({
	ready: function(){
		console.log("in here?")
		return FlowRouter.subsReady("getChat");
	},
	getMsn: function(){
		return Meteor.users.find({},{transform: (item)=>{
			item.coments = CHAT.find({idSource : item._id}).fetch().length;	
			return item;
		}});
	},
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