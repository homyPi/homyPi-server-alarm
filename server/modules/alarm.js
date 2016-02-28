var Alarm = require("./Alarm");
var AlarmModels = require("../link").getShared().MongooseModels.Alarm;

/**
 * Add a new alarm
 * @param  {Object} req express request object
 * @param  {Object} res express response object
 */
var post = function (req, res) {
    if (!req.body.raspberry ||
        !req.body.raspberry.name ||
        !req.body.alarm ||
        isNaN(req.body.alarm.hours) ||
        isNaN(req.body.alarm.minutes)) {
        return res.json({error: "invalid request"});
    }
    var alarm = new Alarm(req.user,
        req.body.raspberry,
        req.body.alarm.hours,
        req.body.alarm.minutes);
    return alarm.save(function (err) {
        if (err) {
            return res.json({error: err});
        }
        console.log("alarm inserted. notify raspberry:" + req.body.raspberry.name);
        process.messager.emit("raspberry:" + req.body.raspberry.name, "alarm:new", alarm);
        return res.json({alarm: alarm});
    });
};
/**
 * Get all alarms
 */
var getAll = function (req, res) {
    Alarm.getAll()
        .then(function (alarms) {
            return res.json({alarms: alarms});
        }).catch(function (error) {
            return res.json(error);
        });
};
/**
 * Get all alarms for a raspberry
 */
var getAllForRaspberry = function (req, res) {
    if (!req.params.raspberryName)
        return res.json({status: "error", error: {message: "invalid request"}});
    return Alarm.getByRaspberry(req.params.raspberryName)
        .then(function (alarms) {
            return res.json({
                status: "success",
                data: {
                    items: alarms,
                    total: alarms.length
                }
            });
        }).catch(function (error) {
            return res.json({status: "error", error: error});
        });
};

/**
 * Get an alarm by id passed in request parameter
 * @param {ObjectId} req.param.id Id
 */
var getOne = function (req, res) {
    Alarm.getOne(req.params.id)
        .then(function (alarm) {
            return res.json({alarm: alarm});
        }).catch(function (error) {
            return res.json(error);
        });
};

/**
 * Get alarm history with the id passed in req.params
 * @param {ObjectId} req.param.id Id
 */
var getHistory = function (req, res) {
    Alarm.getOne(req.params.alarmId)
        .then(function (alarm) {
            return res.json({history: alarm.history});
        }).catch(function (error) {
            return res.json(error);
        });
};

var addHistory = function (req, res) {
    if (!req.body.history) {
        return res.json({err: "bad request"});
    }
    console.log(JSON.stringify({
        $push: {
            history: req.body.history
        }
    }, null, 4));
    return AlarmModels.findByIdAndUpdate(req.params.alarmId, {
        $push: {
            history: req.body.history
        }
    }, {upsert: true},
        function (err, alarm) {
            if (err) {
                console.error(err);
                return res.json(err);
            }
            return res.json({history: alarm.history});
        });
};

/**
 * Update an alarm
 */
var edit = function (req, res) {
    console.log("update alarm " + req.params.alarmId + "  set: ",
        JSON.stringify(req.body, null, 4));
    if (!req.body) {
        return res.json({err: "bad request"});
    }
    return AlarmModels.findByIdAndUpdate(req.params.alarmId, {
        $set: req.body
    }, {new: true}, function (err, alarm) {
        if (err) {
            console.error(err);
            return res.json(err);
        }
        process.messager.emit("raspberry:" + alarm.raspberry.name,
            "alarm:updated", {alarm: alarm});
        return res.json({alarm: alarm});
    });
};

/**
 * Remove an alarm
 */
var remove = function (req, res) {
    if (!req.params.id) {
        return res.json({error: "bad request"});
    }
    return Alarm.getOne(req.params.id).then(function (alarm) {
        Alarm.model.remove({_id: req.params.id}, function (err) {
            if (err) {
                return res.json({error: err});
            }
            process.messager.emit("raspberry:" + alarm.raspberry.name,
                "alarm:removed", {alarm: alarm});
            return res.json({success: "sucess"});
        });
    }).catch(function (err) {
        return res.json({error: err});
    });
};

module.exports = {
    post: post,
    getAll: getAll,
    getAllForRaspberry: getAllForRaspberry,
    getOne: getOne,
    remove: remove,
    getHistory: getHistory,
    addHistory: addHistory,
    edit: edit
};
