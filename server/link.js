var Shared;

module.exports = {
    load: function (AppShared) {
        Shared = AppShared;
        require("./modules/alarmSocket")(Shared.io);
    },
    getShared: function () {
        return Shared;
    }
};
