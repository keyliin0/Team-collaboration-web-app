import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { ModifyTask } from "../../../actions";

class EditTask extends Component {
  constructor(props) {
    super(props);
    const { task } = this.props;
    this.state = {
      name: task.name,
      description: task.description,
      type: task.type,
      open: false
    };
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleSubmit() {
    const { task } = this.props;
    this.props.ModifyTask(
      task._id,
      this.state.name,
      this.state.description,
      this.state.type
    );
    this.setState({ open: false });
  }
  render() {
    const { open } = this.state;
    return (
      <div style={{ display: "inline-block" }}>
        <button className="btn btn-primary" onClick={this.onOpenModal}>
          <i className="far fa-edit" />
        </button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="modify-task-modal">
            <div className="header">
              <h5>Add an event</h5>
            </div>
            <div className="name">
              <input
                placeholder=" "
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
              />
              <span>Name</span>
            </div>
            <textarea
              className="description"
              placeholder="Description"
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
            <select
              onChange={event => this.setState({ type: event.target.value })}
              className="type custom-select"
              value={this.state.type}
            >
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
            <div className="btn">
              <button
                className="btn btn-primary"
                onClick={() => this.handleSubmit()}
              >
                Save
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
  { ModifyTask }
)(EditTask);
