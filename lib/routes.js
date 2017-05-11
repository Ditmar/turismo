
FlowRouter.route("/",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"contentMain"});
	}
});
FlowRouter.route("/soporte",{
	subscriptions: function(params,queryParams){
		//console.log(queryParams);
		this.register("getMSN",Meteor.subscribe("getMSN",queryParams.idus,queryParams.id));
		this.register("getConnections",Meteor.subscribe("getConnections"));	
	},
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner_nav",content:"soporteTemplate"});
	}
});
