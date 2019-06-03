import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <div className="head" />
        <div className="content">
          <ul>
            <li>
              <button>
                <i className="fas fa-home" />
                Home
              </button>
            </li>
            <li onClick={() => this.props.history.push("/Mail/List")}>
              <button>
                <i className="fas fa-envelope" />
                Inbox
              </button>
            </li>
            <li onClick={() => this.props.history.push("/filebrowser")}>
              <button>
                <i className="fas fa-file-invoice" />
                Files
              </button>
            </li>
            <li onClick={() => this.props.history.push("/tasks")}>
              <button>
                <i className="fas fa-tasks" />
                Tasks
              </button>
            </li>
            <li onClick={() => this.props.history.push("/groups/my")}>
              <button>
                <i className="fas fa-users" />
                Groups
              </button>
            </li>
            <li onClick={() => this.props.history.push("/chat")}>
              <button>
                <i className="fas fa-comment-alt" />
                Chat room
              </button>
            </li>
            <li onClick={() => this.props.history.push("/calendar")}>
              <button>
                <i className="fas fa-calendar-alt" />
                Calender
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
