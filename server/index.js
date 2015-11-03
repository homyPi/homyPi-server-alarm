var routes = require("./modules/alarmRoutes");
var Link = require("./Link");
module.exports = {
	link: function() {},
	setSocket: function(socket) {
		require("./modules/alarmSocket")(socket);
	},
	routes: function(app, router) {
		routes(router);
		return router;
	},
	config: require("./config"),
	link: function(moduleManager, Raspberry, MongooseModels, UserMiddleware) {
		Link.Raspberry = Raspberry;
		Link.MongooseModels = MongooseModels;
		Link.User = {
			middleware: UserMiddleware
		}
	}
}
