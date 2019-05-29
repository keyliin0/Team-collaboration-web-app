import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import Users from "./Users";
import Comments from "./Comments";
import AddUsers from "./AddUsers";
import EditTask from "./EditTask";
import { DeleteTask } from "../../../actions";

class TaskInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleDelete() {
    const { task } = this.props;
    this.props.DeleteTask(task._id);
  }
  render() {
    const { open } = this.state;
    const { task } = this.props;
    return (
      <div>
        <li onClick={this.onOpenModal}>{task.name}</li>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="task-modal">
            <div className="card-body">
              <h3 className="name">{task.name}</h3>
              <p className="description">{task.description}</p>
              <Users users={task._users} />
            </div>
            <Comments task_id={task._id} />
            <div className="manage">
              <button
                className="btn btn-danger"
                onClick={() => this.handleDelete()}
              >
                <i className="far fa-trash-alt" />
              </button>

              <EditTask task={task} />
              <AddUsers
                group_id={this.props.group_id}
                active_users={task._users}
                task_id={task._id}
              />
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
)(TaskInfo);
