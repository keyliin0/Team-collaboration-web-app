import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ModifyEvent, FetchCalendar } from "../../actions";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      date: new Date(this.props._event.timestamp),
      title: this.props._event.title,
      description: this.props._event.description
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleDateChange(date) {
    this.setState({
      date: date
    });
  }
  handleSubmit() {
    this.setState({ loading: true });
    this.props
      .ModifyEvent(
        this.props._event._id,
        this.state.date.getTime(),
        this.state.date.getMonth(),
        this.state.date.getFullYear(),
        this.state.title,
        this.state.description
      )
      .then(() => this.setState({ open: false }));
  }
  render() {
    const { open } = this.state;
    return (
      <div className="add-event">
        <button className="btn btn-primary" onClick={this.onOpenModal}>
          <i className="fas fa-edit" />
        </button>
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
              onChange={this.handleDateChange}
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

export default withRouter(
  connect(
    null,
    { ModifyEvent, FetchCalendar }
  )(EditEvent)
);
