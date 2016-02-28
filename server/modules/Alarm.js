/**
 * Created by nolitsou on 9/6/15.
 */

var AlarmModel = require("../link").getShared().MongooseModels.Alarm;
var Promise = require("bluebird");

var Alarm = function (user, raspberry, hours, minutes, repeat, source, enable) {
    "use strict";
    AlarmModel.call(this);
    this.user = user;
    this.raspberry = raspberry;
    this.hours = hours;
    this.minutes = minutes;
    this.repeat = repeat || false;
    this.source = source || Alarm.const.SOURCES.SPOTIFY;
    this.enable = enable;
    if (this.enable === undefined) {
        this.enable = true;
    }
};
Alarm.prototype = Object.create(AlarmModel.prototype);

Alarm.const = {
    SOURCES: {
        SPOTIFY: 0
    }
};

Alarm.getAll = function () {
    return new Promise(function (resolve, reject) {
        AlarmModel.find({}, function (err, alarms) {
            if (err) {
                return reject(err);
            }
            return resolve(alarms);
        });
    });
};
Alarm.getOne = function (id) {
    return new Promise(function (resolve, reject) {
        AlarmModel.findOne({_id: id}, function (err, alarm) {
            if (err) {
                return reject(err);
            }
            return resolve(alarm);
        });
    });
};
Alarm.getByRaspberry = function (raspberryName) {
    return new Promise(function (resolve, reject) {
        AlarmModel.find({"raspberry.name": raspberryName}, function (err, alarms) {
            if (err) {
                return reject(err);
            }
            return resolve(alarms);
        });
    });
};
Alarm.getByUser = function (userId) {
    return new Promise(function (resolve, reject) {
        AlarmModel.find({"user._id": userId}, function (err, alarms) {
            if (err) {
                return reject(err);
            }
            return resolve(alarms);
        });
    });
};
Alarm.model = AlarmModel;
module.exports = Alarm;
