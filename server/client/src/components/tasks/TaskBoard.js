import React, { Component } from "react";
import TaskList from "./TaskList";

class TaskBoard extends Component {
  render() {
    return (
      <div className="taskboard-container col col-10 h-75">
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-outline-primary">
            To Do
          </button>
          <button type="button" className="btn btn-outline-success">
            Doing
          </button>
          <button type="button" className="btn btn-outline-danger">
            Done
          </button>
        </div>
        <div className="col col-12">
          <TaskList />
          <TaskList />
          <TaskList />
        </div>
      </div>
    );
  }
}

export default TaskBoard;
