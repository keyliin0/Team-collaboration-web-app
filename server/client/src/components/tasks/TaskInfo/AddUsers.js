import React, { Component } from "react";
import { connect } from "react-redux";
import { ModifyUsersTask } from "../../../actions";
import Modal from "react-responsive-modal";
import axios from "axios";
import _ from "lodash";

class AddUsers extends Component {
  constructor(props) {
    super(props);
    this.mounted = this.state = { open: false, users: [], loading: true };
  }
  async componentDidMount() {
    const request = await axios.get("/api/group/users/" + this.props.group_id);
    var is_active = [];
    this.props.active_users.map(active_user => {
      is_active[active_user._id] = 1;
    });
    var users = [];
    request.data.map(
      user =>
        (users = [
          ...users,
          { ...user, active: is_active[user._id] ? true : false }
        ])
    );
    this.setState({ users: _.mapKeys(users, "_id"), loading: false });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleClick(user_id) {
    this.setState({
      users: {
        ...this.state.users,
        [user_id]: {
          ...this.state.users[user_id],
          active: !this.state.users[user_id].active
        }
      }
    });
  }
  renderUsers() {
    if (this.state.loading) return <div className="loader" />;
    return _.map(this.state.users, user => {
      return (
        <li key={user._id}>
          <img
            className="rounded-circle image"
            width="40"
            height="40"
            src={user.imgURL}
          />{" "}
          <span className="name">{user.firstname + " " + user.lastname}</span>
          <button
            onClick={() => this.handleClick(user._id)}
            className={"btn btn-" + (user.active ? "danger" : "primary")}
          >
            <i className={"fas fa-" + (user.active ? "times" : "plus")} />
          </button>
        </li>
      );
    });
  }
  handleSubmit() {
    var users_id = [];
    _.map(this.state.users, user => {
      if (user.active) users_id.push(user._id);
    });
    this.props.ModifyUsersTask(this.props.task_id, users_id);
    this.setState({ open: false });
  }
  render() {
    const { open } = this.state;
    return (
      <div style={{ display: "inline-block" }}>
        <button className="btn btn-primary" onClick={this.onOpenModal}>
          <i className="fas fa-plus" />
        </button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="add-users-modal">
            <div className="header">Add/Remove Users</div>
            <ul>{this.renderUsers()}</ul>
            {this.state.loading ? (
              ""
            ) : (
              <button
                onClick={() => this.handleSubmit()}
                className={"btn btn-primary"}
              >
                Save
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
  { ModifyUsersTask }
)(AddUsers);
