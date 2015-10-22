var routes = require("./alarmRoutes");
module.exports = {
	link: function() {},
	setSocket: function(socket) {
		require("./alarmSocket")(socket);
	},
	routes: function(app, router) {
		routes(router);
		return router;
	},
	config: require("./config")
}
