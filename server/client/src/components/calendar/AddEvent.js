import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateEvent, FetchCalendar } from "../../actions";

const INITIAL_STATE = {
  open: false,
  code: null,
  loading: false,
  date: new Date(),
  title: "",
  description: ""
};

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleChange(date) {
    this.setState({
      date: date
    });
  }
  handleSubmit() {
    this.setState({ loading: true });
    this.props
      .CreateEvent(
        this.props.group_id,
        this.state.date.getTime(),
        this.state.date.getMonth(),
        this.state.date.getFullYear(),
        this.state.title,
        this.state.description
      )
      .then(() => this.setState(INITIAL_STATE));
  }
  render() {
    const { open } = this.state;
    return (
      <div className="add-event">
        <div className="add-event-button">
          <i onClick={this.onOpenModal} className="fas fa-plus" />
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="add-event-modal">
            <div className="header">
              <h5>Add an event</h5>
            </div>
            <div className="title">
              <input
                placeholder=" "
                value={this.state.title}
                onChange={event => this.setState({ title: event.target.value })}
              />
              <span>Title</span>
            </div>
            <DatePicker
              selected={this.state.date}
              onChange={this.handleChange}
              placeholderText="Click to select a date"
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
              showTimeSelect
            />
            <textarea
              className="Description"
              placeholder="Description"
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
            {this.state.loading ? (
              <div className="loader-small" />
            ) : (
              <button
                className="btn btn-primary"
                onClick={event => this.handleSubmit()}
              >
                <i className="fas fa-check" />
              </button>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  { CreateEvent, FetchCalendar }
)(AddEvent);
