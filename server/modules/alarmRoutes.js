module.exports = function(router) {
	var AlarmMiddleware = require("./alarm");
	var UserMiddleware = require("../Link").User.middleware;

	router.get('/', UserMiddleware.isLoggedIn, AlarmMiddleware.getAll);
	router.post('/', UserMiddleware.isLoggedIn, AlarmMiddleware.post);
	router.get('/:id', UserMiddleware.isLoggedIn, AlarmMiddleware.getOne);
	router.delete('/:id', UserMiddleware.isLoggedIn, AlarmMiddleware.remove);

	router.put('/:alarmId', UserMiddleware.isLoggedIn, AlarmMiddleware.edit);

	router.get("/:alarmId/history", UserMiddleware.isLoggedIn, AlarmMiddleware.getHistory)
	router.post("/:alarmId/history", UserMiddleware.isLoggedIn, AlarmMiddleware.addHistory)

	return router;
};