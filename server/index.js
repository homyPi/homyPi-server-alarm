var routes = require("./modules/alarmRoutes");

module.exports = {
    routes: function (app, router) {
        routes(router);
        return router;
    },
    config: require("./config"),
    link: require("./link")
};
