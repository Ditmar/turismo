
FlowRouter.route("/",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainPage",{mainmenu:"mainnav",banner:"imagenes",soporte:"chat"});
	}
});

FlowRouter.route("/galerias",{
	action : function(params,queryParams) {
		BlazeLayout.render("mainPage",{mainmenu:"mainnav"});
	}
});