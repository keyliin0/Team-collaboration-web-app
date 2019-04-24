import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Task from "./Task";

class Days extends Component {
  getMonday() {
    var d = new Date(this.props.year, this.props.month, 1, 0, 0, 0, 0);
    var day = 0;
    // check if first of the month is a Sunday, if so set date to the second
    if (d.getDay() == 0) {
      day = 2;
      d = d.setDate(day);
      d = new Date(d);
    }
    // check if first of the month is a Monday, if so return the date, otherwise get to the Monday following the first of the month
    else if (d.getDay() != 1) {
      day = 9 - d.getDay();
      d = d.setDate(day);
      d = new Date(d);
    }
    return d;
  }
  RenderDisabledDays() {
    const monday = this.getMonday().getDate(); // get first monday  of the month
    const disabled_days = 7 - (monday - 1) == 7 ? 0 : 7 - (monday - 1);
    var res = [];
    for (var i = 0; i < disabled_days; i++)
      res.push(
        <div className="day day-disabled" key={i + "disabled"}>
          {" "}
        </div>
      );
    return res;
  }
  RenderTasks(day) {
    return _.map(this.props.calendar, task => {
      const d = new Date(task.timestamp);
      if (d.getDate() == day) return <Task key={task._id} task={task} />;
    });
  }
  RenderDays() {
    const LastDay = new Date(
      this.props.year,
      this.props.month + 1,
      0
    ).getDate(); // get last day of the month
    var res = [];
    for (var i = 1; i <= LastDay; i++)
      res.push(
        <div className="day" key={i}>
          {i}
          {this.RenderTasks(i)}
        </div>
      );
    return res;
  }
  render() {
    console.log(this.props.calendar);
    return (
      <div className="days">
        <div className="day-name">Mon</div>
        <div className="day-name">Tue</div>
        <div className="day-name">Wed</div>
        <div className="day-name">Thu</div>
        <div className="day-name">Fri</div>
        <div className="day-name">Sat</div>
        <div className="day-name">Sun</div>
        {this.RenderDisabledDays()}
        {this.RenderDays()}
      </div>
    );
  }
}

function mapStateToProps({ calendar }) {
  return { calendar: calendar };
}

export default connect(mapStateToProps)(Days);
