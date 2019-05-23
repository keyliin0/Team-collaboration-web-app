import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import moment from "moment";
import { DeleteEvent } from "../../actions";
import EditEvent from "./EditEvent";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, code: null };
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  HandleDelete() {
    this.props.DeleteEvent(this.props.event._id);
    this.setState({ open: false });
  }
  render() {
    const { open } = this.state;
    return (
      <div>
        <section onClick={this.onOpenModal} className="event-primary">
          {this.props.event.title}
        </section>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="event-modal">
            <div className="title">{this.props.event.title}</div>
            <div className="time">
              <i className="far fa-clock" />
              {moment(this.props.event.timestamp).format(
                "MMMM Do YYYY, h:mm a"
              )}
            </div>
            <hr />
            <div className="description">
              <i className="fas fa-tasks" />
              {this.props.event.description}
            </div>
            <div className="buttons">
              <button
                className="btn btn-danger"
                onClick={event => this.HandleDelete()}
              >
                <i className="far fa-trash-alt" />
              </button>
              <div className="edit-event">
                <EditEvent _event={this.props.event} />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  { DeleteEvent }
)(Event);
