var TestTool = require("homyPi_webApp/test_tools/server");
var should = require("should");

var Alarm;

var configs = {
	server_config: {
		MONGO_URI: "mongodb://localhost/hommyPi"
	}
}

var testTool = new TestTool(configs);
testTool.addModule("homyPi-server-alarm", require("../config"), require("../"));
testTool.addModule("homyPi-server-music",require("homyPi-server-music/server/config"),require("homyPi-server-music/server/"));

var alarm;

describe('Alarms', function() {
	before(function(done) {
		process.io = {
			emit: function(event, data){}
		}
		testTool.start().then(function() {
		Alarm  = require("../modules/Alarm");
			done();
		}).catch(function(err) {
			done(err);
		})
	});

	it("Adding an alarm", function(done) {
		alarm = new Alarm({username: "alarmTest"}, {name: "rick"}, 08, 15);
		alarm.save(function(err) {
			should(err).not.be.ok();
			should(alarm).have.property("_id");
			done();
		});
	});

	it("Removing an alarm", function(done) {
		alarm.remove(function(err) {
			should(err).not.be.ok();
			console.log("should be removed, checking if " + alarm._id + " does not exists anymore");
			Alarm.getOne(alarm._id).then(function(a) {
				should(a).not.be.ok();
				done();
			}).catch(function(err) {
				err = err || "error";
				done(err);
			});
		});
	});

});



