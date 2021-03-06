import React from 'react';
import AlarmStore from '../stores/AlarmStore';
import AlarmActions from '../actions/AlarmActionCreators';
import Alarm from './Alarm';
import {Paper, RaisedButton, TimePicker} from 'material-ui';
import Link from "../Link";
export default React.createClass({
  getDefaultProps() {
    return {};
  },
  _onChange() {
    this.setState({
      alarms: AlarmStore.getAll().alarms
    });
  },
  getInitialState() {
    AlarmActions.loadAlarms();
    return {
      alarms: AlarmStore.getAll().alarms
    };
  },
  componentDidMount() {
    AlarmStore.addChangeListener(this._onChange);
    this.refs.timePicker._handleInputTouchTap(new Event('build'));
  },

  componentWillUnmount() {
    AlarmStore.removeChangeListener(this._onChange);
  },
  deleteAlarm(alarm) {
    AlarmActions.deleteAlarm(alarm);
  },
  addAlarm() {
    var raspberry = Link.getRaspberries().selectedRaspberry;
    if (raspberry) {
      AlarmActions.addAlarm(raspberry, {hours: 8, minutes:0});
    }
  },
  editAlarm(alarm) {
    var raspberry = Link.getRaspberries().selectedRaspberry;
    if (raspberry) {
      AlarmActions.editAlarm(raspberry, alarm);
    }
  },
  enableAlarm(alarm, event) {
    AlarmActions.enableAlarm(alarm, event.target.checked);
  },
  render() {
    let {alarms, newAlarm} = this.state;
    return (
       <div id="alarm-list">
       <Paper>
          <h1>Alarms</h1>
          {alarms.map(alarm =>
            <Alarm key={alarm._id} alarm={alarm} onDelete={this.deleteAlarm} editAlarm={this.editAlarm} enable={this.enableAlarm}/>
          )}
          <RaisedButton label="Add" onClick={this.addAlarm}/>
        </Paper>
      </div>
    );
  }
});
