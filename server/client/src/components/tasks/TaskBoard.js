import React, { Component } from "react";
import TaskList from "./TaskList";
import { connect } from "react-redux";
import { FetchTask } from "../../actions";

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { show_todo: true, show_doing: true, show_done: true };
  }
  componentWillMount() {
    this.props.FetchTask(this.props.match.params.id);
  }
  render() {
    return (
      <div className="taskboard-container col col-10 h-75">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={
              "btn " +
              (this.state.show_todo ? "btn-primary" : "btn-outline-primary")
            }
            onClick={() => this.setState({ show_todo: !this.state.show_todo })}
          >
            To Do
          </button>
          <button
            type="button"
            className={
              "btn " +
              (this.state.show_doing ? "btn-primary" : "btn-outline-primary")
            }
            onClick={() =>
              this.setState({ show_doing: !this.state.show_doing })
            }
          >
            Doing
          </button>
          <button
            type="button"
            className={
              "btn " +
              (this.state.show_done ? "btn-primary" : "btn-outline-primary")
            }
            onClick={() => this.setState({ show_done: !this.state.show_done })}
          >
            Done
          </button>
        </div>
        <div className="col-12">
          {this.state.show_todo ? (
            <TaskList group_id={this.props.match.params.id} type={"To Do"} />
          ) : (
            ""
          )}
          {this.state.show_doing ? (
            <TaskList group_id={this.props.match.params.id} type={"Doing"} />
          ) : (
            ""
          )}
          {this.state.show_done ? (
            <TaskList group_id={this.props.match.params.id} type={"Done"} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { FetchTask }
)(TaskBoard);
