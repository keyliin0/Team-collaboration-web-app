import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import moment from "moment";
import { DeleteTask } from "../../actions";

class Task extends Component {
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
    this.props.DeleteTask(this.props.task._id);
    this.setState({ open: false });
  }
  render() {
    console.log(this.props.task);
    const { open } = this.state;
    return (
      <div>
        <section onClick={this.onOpenModal} className="task-primary">
          {this.props.task.title}
        </section>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="task-modal">
            <div className="title">{this.props.task.title}</div>
            <div className="time">
              <i className="far fa-clock" />
              {moment(this.props.task.timestamp).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </div>
            <hr />
            <div className="description">
              <i className="fas fa-tasks" />
              {this.props.task.description}
            </div>
            <div className="buttons">
              <button
                className="btn btn-danger"
                onClick={event => this.HandleDelete()}
              >
                <i className="far fa-trash-alt" />
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-edit" />
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  { DeleteTask }
)(Task);
