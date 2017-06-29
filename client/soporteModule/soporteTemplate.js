Template.msn_template.onRendered(function(){
	//function test(){
	//	console.log(" "+$("#contenedor").height());
	//}
	//setInterval(test,20);
	$("#contenedor").resizeDiv(function(num){
		$(".rectangle_hidden").animate({scrollTop:num},500);
	});
});
var imagesHandler = new SubsManager();
Template.templateSupport.onCreated(function() {
	this.ready = new ReactiveVar(false);
	this.currentUpload = new ReactiveVar(false);
	var self = this;
	this.autorun(function(){
		var handler = imagesHandler.subscribe("files");
		if (handler.ready()) {
			self.ready.set(true);
		}
	});
});
Template.templateSupport.helpers({
	imageFile: function() {
		if (Template.instance().idIMG != null) {
			var id = Template.instance().idIMG;	
		} else {
			return false;
		}
		
		return IMAGES.findOne({_id: id});
	},
	ifUploading: function() {

		return Template.instance().currentUpload.get();
	},
	ready: function(){
		return FlowRouter.subsReady("getConnections") && Template.instance().ready.get();
	},
	user_connection_list: function(){
		return CONNECT.find();
	},
	user_list: function(){
		return Meteor.users.findOne({_id:this.idUs});
	}
});
Template.templateSupport.events({
	"change #file": function(e, template) {
		if (e.currentTarget.files && e.currentTarget.files[0]) {
      		// We upload only one file, in case
      		// multiple files were selected
      		const upload = IMAGES.insert({
        		file: e.currentTarget.files[0],
        		streams: 'dynamic',
        		chunkSize: 'dynamic'
      		}, false);
      		upload.on('start', function () { 
        		template.currentUpload.set(true);
      		});
		    upload.on('end', function (error, fileObj) {
		    	console.log(fileObj);
		    	template.idIMG = fileObj._id;
		    	if (error) {
		          alert('Error during upload: ' + error);
		        } else {
		          alert('File "' + fileObj.name + '" successfully uploaded');
		        }
		        template.currentUpload.set(false);
		      });
      		upload.start();
    	}
	},
	"submit form": function(e) {
		var msn = e.target.msn.value;
		if(idDestination.get() != undefined) {
			if (e.target.files.value != "") {
				msn = "<img src='" + e.target.files.value + "' width='200'/>";
				msn += "<a href='" + e.target.files.value + "?download=true'  target='_parent'>Descargar</a>";
			}
			obj ={
				idSource: Accounts.user()._id,
				idDestination: idDestination.get(),
				message:msn,
				date: new Date()
			}
			e.target.msn.value = "";
			e.target.files.value = "";
			Meteor.call("addChat",obj,function(){
			});	
		}else{
			alert("Debe seleccionar a un usuario primero")
		}
		
		//console.log(obj);
		/*Meteor.call("addChat",obj,function(){	

		});*/
		return false;
	}
});
var idDestination = new ReactiveVar();
Template.itemConnection.events({
	"click #users_list": function(){
		idDestination.set(this._id);
		FlowRouter.setQueryParams({idus:this._id,id:Accounts.user()._id});
		
	}
})
Template.msn_template.helpers({

	ready: function(){
		
		return FlowRouter.subsReady("getMSN");
	},
	list_msn: function(){
		return CHAT.find();
	},
	user_source: function(){
		return Meteor.users.findOne({_id:this.idSource});
	},
	user_destination: function(){
		//console.log(this.idSource);
		//console.log(Meteor.users.findOne({_id:this.idSource}));
		
		return Meteor.users.findOne({_id:this.idSource});
	},
	idMe: function(){
		return Accounts.user()._id == this.idSource;	
	}

});	