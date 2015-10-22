import React from 'react';
import { Router, Route, DefaultRoute} from 'react-router';
import {MenuItem} from "material-ui";


import AlarmList from './components/AlarmList';

module.exports = {
	routes: (
		<Route name="alarms" path="alarms" component={AlarmList} />
	),
	menu: [
		{ route: '/app/alarms', text: 'Alarms' }
	]
};