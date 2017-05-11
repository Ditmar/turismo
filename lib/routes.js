
FlowRouter.route("/",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner",content:"contentMain"});
	}
});
FlowRouter.route("/soporte",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainpage",{banner:"banner_nav",content:"soporteTemplate"});
	}
});
