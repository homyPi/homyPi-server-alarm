import AlarmActionCreators from "./actions/AlarmActionCreators";
var Link = require("./Link");
module.exports = {
	link: function(links) {
		let {selectedRaspberry} = links.getRaspberries();
		Link.getRaspberries = links.getRaspberries;
		if (selectedRaspberry && selectedRaspberry.name) {
			AlarmActionCreators.loadAlarms(selectedRaspberry);
		} else {
			AlarmActionCreators.clear();
		}
		links.watchRaspberry(function(event, data) {
			if (event === links.RASPBERRY_EVENTS.SELECTED_CHANGED) {
				if (data && data.selected && data.selected.name) {
					AlarmActionCreators.loadAlarms(data.selected);
				} else {
					AlarmActionCreators.clear();
				}
			}
		})
	},
	config: require("./config")
}