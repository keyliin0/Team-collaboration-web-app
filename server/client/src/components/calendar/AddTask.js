import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateTask, FetchCalendar } from "../../actions";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      code: null,
      loading: false,
      date: new Date(),
      title: "",
      description: ""
    };
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
    this.props.CreateTask(
      this.props.group_id,
      this.state.date.getTime(),
      this.state.date.getMonth(),
      this.state.date.getFullYear(),
      this.state.title,
      this.state.description
    );
    this.setState({ open: false });
  }
  render() {
    const { open } = this.state;
    return (
      <div className="add-task">
        <div className="add-task-button">
          <i onClick={this.onOpenModal} className="fas fa-plus" />
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="add-task-modal">
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
            <button
              className="btn btn-primary"
              onClick={event => this.handleSubmit()}
            >
              <i className="fas fa-check" />
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  { CreateTask, FetchCalendar }
)(AddTask);
