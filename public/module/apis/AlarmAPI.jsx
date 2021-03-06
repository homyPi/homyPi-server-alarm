import $ from 'jquery'
var UserAPI = window.UserAPI;

var config = window.homy_config;
var serverUrl = (config.server_url || "") + "/api/modules/alarms";

function setHeaders(xhr) {
    xhr.setRequestHeader ("Authorization", "Bearer " + UserAPI.getToken());
}

export default {
	getAlarms(raspberry) {
		return new Promise((resolve, reject) => {
			$.ajax({
					url: serverUrl + "/raspberries/" + raspberry.name,
					type: "GET",
					beforeSend: setHeaders,
					success: function(resp) {
						if(resp.status === "success") {
							resolve(resp.data.items);
						} else {
							reject(resp.error);
						}
					},
					fail: function(err) {
						reject(err)
					}
				});
		});
	},
	deleteAlarm(alarm) {
		return new Promise((resolve, reject) => {
			$.ajax({
					url: serverUrl + "/" + alarm._id,
					type: "DELETE",
					beforeSend: setHeaders,
					success: function(resp) {
						resolve(alarm);
					},
					fail: function(err) {
						reject(err)
					}
				});
		});
	},
	insertAlarm(raspberry, alarm) {
		return new Promise((resolve, reject) => {
			$.ajax({
					url: serverUrl + "/",
					type: "POST",
				    data: JSON.stringify({ alarm: alarm, raspberry: raspberry }),
				    contentType: "application/json; charset=utf-8",
				    dataType: "json",
					beforeSend: setHeaders,
					success: function(resp) {
						if (resp.error) {
							return reject(resp.error);
						} else {
							alarm._id = resp.alarm._id;
							return resolve(alarm);
						}
					},
					fail: function(err) {
						reject(err)
					}
				});
		});
	},
	updateAlarm(alarm) {
		alarm.raspberry = raspberry;
		return new Promise((resolve, reject) => {
			$.ajax({
					url: serverUrl + "/" + alarm._id,
					type: "PUT",
					data: JSON.stringify({
						hours: alarm.hours,
						minutes: alarm.minutes
					}),
				    contentType: "application/json; charset=utf-8",
				    dataType: "json",
					beforeSend: setHeaders,
					success: function(resp) {
						resolve(alarm);
					},
					fail: function(err) {
						reject(err)
					}
				});
		});
	},
	enableAlarm(alarm, enabled) {
		return new Promise(function(resolve, reject) {
			$.ajax({
					url: serverUrl + "/" + alarm._id,
					type: "PUT",
					data: JSON.stringify({ enable: enabled}),
				    contentType: "application/json; charset=utf-8",
				    dataType: "json",
					beforeSend: setHeaders,
					success: function(resp) {
						alarm.enable = enabled;
						resolve(alarm);
					},
					fail: function(err) {
						reject(err)
					}
				});
		});
	}
};