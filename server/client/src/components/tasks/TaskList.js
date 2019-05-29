import React, { Component } from "react";
import TaskInfo from "./TaskInfo/TaskInfo";
import AddTask from "./AddTask";
import { connect } from "react-redux";
import _ from "lodash";
import ContentLoader from "react-content-loader";

const Loader = () => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
    <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
  </ContentLoader>
);

class TaskList extends Component {
  renderTasks() {
    return _.map(this.props.tasks, task => {
      if (task.type === this.props.type)
        return (
          <TaskInfo group_id={this.props.group_id} key={task._id} task={task} />
        );
    });
  }
  render() {
    if (!this.props.tasks)
      return (
        <div className="task-list col col-3">
          <Loader />
        </div>
      );
    return (
      <div className="task-list col col-3">
        <h3 className="title">{this.props.type}</h3>
        <ul className="items">{this.renderTasks()}</ul>
        <AddTask group_id={this.props.group_id} type={this.props.type} />
      </div>
    );
  }
}

function mapStateToProps({ tasks }) {
  return { tasks: tasks };
}

export default connect(mapStateToProps)(TaskList);
