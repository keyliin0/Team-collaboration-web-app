import React, { Component } from "react";
import TaskInfo from "./TaskInfo/TaskInfo";

class TaskBoard extends Component {
  render() {
    return (
      <div className="task-list col col-3">
        <h3 className="title">Tasks to Do</h3>
        <ul className="items">
          <TaskInfo />
          <li>Email mock-up to client for feedback</li>
          <li>Update personal website header background image</li>
          <li>Update personal website heading fonts</li>
          <li>Add google map to personal website</li>
          <li>Begin draft of CSS Grid article</li>
          <li>Read new CSS-Tricks articles</li>
          <li>Read new Smashing Magazine articles</li>
          <li>Read other bookmarked articles</li>
          <li>Look through portfolios to gather inspiration</li>
          <li>Create something cool for CodePen</li>
          <li>Post latest CodePen work on Twitter</li>
          <li>Listen to new Syntax.fm episode</li>
          <li>Listen to new CodePen Radio episode</li>
        </ul>
        <button className="add-card-btn btn">Add a card</button>
      </div>
    );
  }
}

export default TaskBoard;
