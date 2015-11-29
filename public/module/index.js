import AlarmActionCreators from "./actions/AlarmActionCreators";

module.exports = {
	link: function(links) {
		let {selectedRaspberry} = links.getRaspberries();
		Link.getRaspberries = links.getRaspberries;
		if (selectedRaspberry && selectedRaspberry.name) {
			AlarmActionCreators.getAll(selectedRaspberry);
		} else {
			AlarmActionCreators.clear();
		}
		links.watchRaspberry(function(event, data) {
			if (event === links.RASPBERRY_EVENTS.SELECTED_CHANGED) {
				if (selectedRaspberry && selectedRaspberry.name) {
					AlarmActionCreators.getAll(selectedRaspberry);
				} else {
					AlarmActionCreators.clear();
				}
			}
		})
	},
	config: require("./config")
}