import React, { Component } from "react";
import Modal from "react-responsive-modal";

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
  render() {
    const { open } = this.state;
    return (
      <div>
        <li onClick={this.onOpenModal}>Listen to new CodePen Radio episode</li>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="task-modal">
            <div className="card-body">
              <h3 className="name">Job title </h3>
              <p className="description">Lorem ipsum dolor sit amet</p>
              <ul className="users">
                <li>
                  <img
                    className="rounded-circle image"
                    width="40"
                    height="40"
                    src="https://getuikit.com/docs/images/avatar.jpg"
                  />
                </li>
                <li>
                  <img
                    className="rounded-circle image"
                    width="40"
                    height="40"
                    src="https://getuikit.com/docs/images/avatar.jpg"
                  />
                </li>
                <li>
                  <img
                    className="rounded-circle image"
                    width="40"
                    height="40"
                    src="https://getuikit.com/docs/images/avatar.jpg"
                  />
                </li>
              </ul>
            </div>
            <div className="section">
              <i className="far fa-comment-dots" />
            </div>

            <ul className="comments">
              <li>
                <img
                  className="rounded-circle image"
                  width="40"
                  height="40"
                  src="https://getuikit.com/docs/images/avatar.jpg"
                />
                <div className="comment">
                  <div className="header">
                    <h3 className="name">John Doe</h3>
                    <span className="time">14.12.2018 13:05</span>
                  </div>
                  <div className="content">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="rounded-circle image"
                  width="40"
                  height="40"
                  src="https://getuikit.com/docs/images/avatar.jpg"
                />
                <div className="comment">
                  <div className="header">
                    <h3 className="name">John Doe</h3>
                    <span className="time">14.12.2018 13:05</span>
                  </div>
                  <div className="content">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                  </div>
                </div>
              </li>
            </ul>
            <div className="make-comment">
              <label>Comment:</label>
              <textarea className="form-control" rows="2" />
              <button className="btn btn-primary">Submit</button>
            </div>
            <div className="manage">
              <button className="btn btn-danger">
                <i className="far fa-trash-alt" />
              </button>
              <button className="btn btn-primary">
                <i className="far fa-edit" />
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default TaskInfo;
