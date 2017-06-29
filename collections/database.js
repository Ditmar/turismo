CHAT = new  Mongo.Collection("chat");
CONNECT = new Mongo.Collection("connect");
IMAGES = new FilesCollection({
  storagePath: '/data',
  downloadRoute: '/files/images',
  collectionName: 'images',
  chunkSize: 1024 * 2048,
  throttle: 1024 * 512,
  permissions: 0755,
  allowClientCode: false,
  cacheControl: 'public, max-age=31536000'
});
var chatSchema = new SimpleSchema({
	idSource: {
		type:String
	},
	idDestination: {
		type:String
	},
	date: {
		type:Date
	},
	message: {
		type:String
	}
});
CHAT.attachSchema(chatSchema);
var connectSchema = new SimpleSchema({
	idUs: {
		type:String
	},
	connectionDate: {
		type:Date
	},
	disconnectionDate: {
		type:Date
	},
	stade: {
		type:Boolean
	}
});
CONNECT.attachSchema(connectSchema);
