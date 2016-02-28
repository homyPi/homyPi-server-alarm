var mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports = {
    path: "alarms",
    require: [{module: "homyPi-server-music", version: "0.1"}],
    schemas: {
        Alarm: {
            user: Schema.Types.Mixed,
            raspberry: Schema.Types.Mixed,
            hours: { type: Number, min: 0, max: 23 },
            minutes: { type: Number, min: 0, max: 59 },
            enable: Boolean,
            repeat: Schema.Types.Mixed,
            history: [{
                execution_date: Date,
                executed_songs: [{
                    source: String,
                    name: String,
                    artist: String,
                    uri: String,
                    similarTo: Schema.Types.Mixed,
                    tempo: String
                }]
            }]
        }
    },
    externals: [
        {
            baseSchema: "Artist",
            name: "alarm",
            schema: {
                doNotUseAsAlarm: Boolean
            }
        }
    ],
    setSchemas: function (schemaDescriptions) {
        mongoose.model("Alarm", new Schema(schemaDescriptions.alarm));
    }
};
