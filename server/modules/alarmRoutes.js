module.exports = function (router) {
    var AlarmMiddleware = require("./alarm");
    var User = require("../link").getShared().User;

    router.get("/", User.isLoggedIn, AlarmMiddleware.getAll);
    router.get("/raspberries/:raspberryName", User.isLoggedIn, AlarmMiddleware.getAllForRaspberry);
    router.post("/", User.isLoggedIn, AlarmMiddleware.post);
    router.get("/:id", User.isLoggedIn, AlarmMiddleware.getOne);
    router.delete("/:id", User.isLoggedIn, AlarmMiddleware.remove);

    router.put("/:alarmId", User.isLoggedIn, AlarmMiddleware.edit);

    router.get("/:alarmId/history", User.isLoggedIn, AlarmMiddleware.getHistory);
    router.post("/:alarmId/history", User.isLoggedIn, AlarmMiddleware.addHistory);

    return router;
};
