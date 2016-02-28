/**
 * Created by nolitsou on 9/8/15.
 */
var Alarm  = require("./Alarm");

module.exports = function(io) {
	return;
	io.on("connection", function(socket) {
		socket.on("alarms:get", function(request) {
			if (socket.raspberryInfo && socket.raspberryInfo.name) {
				Alarm.getByRaspberry(socket.raspberryInfo.name)
					.then(function(alarms) {
						socket.emit("alarms:update", {alarms: alarms});
					}).catch(function(err) {
						socket.emit("error", {err: error});
					});
			} else {
				if (!request) {
					Alarm.getAll()
						.then(function(alarms) {
							socket.emit("alarms:update", {alarms: alarms});
						}).catch(function(error) {
							socket.emit("error", {err: error});
						});
				}
			}
		})
	});
};