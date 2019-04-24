import React, { Component } from "react";
import Days from "./Days";
import AddTask from "./AddTask";
import { connect } from "react-redux";
import { FetchCalendar } from "../../actions";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class Calendar extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      month: date.getMonth(),
      year: date.getFullYear(),
      loading: true
    };
  }
  componentDidMount() {
    this.props
      .FetchCalendar(
        this.props.match.params.id,
        this.state.month,
        this.state.year
      )
      .then(() => this.setState({ loading: false }));
  }
  NextMonth() {
    this.setState({
      loading: true
    });
    const month = this.state.month == 11 ? 0 : this.state.month + 1;
    const year = this.state.month == 11 ? this.state.year + 1 : this.state.year;
    this.props
      .FetchCalendar(this.props.match.params.id, month, year)
      .then(() => this.setState({ month: month, year: year, loading: false }));
  }
  PreviousMonth() {
    this.setState({
      loading: true
    });
    const month = this.state.month == 0 ? 11 : this.state.month - 1;
    const year = this.state.month == 0 ? this.state.year - 1 : this.state.year;
    this.props
      .FetchCalendar(this.props.match.params.id, month, year)
      .then(() => this.setState({ month: month, year: year, loading: false }));
  }
  render() {
    return (
      <div className="calendar-container">
        {this.state.loading ? (
          <div className="header">
            <div className="loader-small" />
          </div>
        ) : (
          <div className="header">
            <AddTask group_id={this.props.match.params.id} />
            <i
              className="fas fa-chevron-circle-left"
              onClick={event => this.PreviousMonth()}
            />
            <h5>{months[this.state.month]}</h5>
            <i
              className="fas fa-chevron-circle-right"
              onClick={event => this.NextMonth()}
            />
            <p>{this.state.year}</p>
          </div>
        )}

        <Days month={this.state.month} year={this.state.year} />
      </div>
    );
  }
}

export default connect(
  null,
  { FetchCalendar }
)(Calendar);
