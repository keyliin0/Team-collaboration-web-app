import React, { Component } from "react";
import _ from "lodash";
import ContentLoader from "react-content-loader";
import axios from "axios";
import CommentList from "./CommentList";

const Loader = () => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#c0c0c0"
  >
    <rect x="70" y="15" rx="4" ry="4" width="250" height="9" />
    <rect x="70" y="37" rx="4" ry="4" width="250" height="9" />
    <circle cx="30" cy="30" r="30" />
  </ContentLoader>
);

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: null, comment: "", loading: true };
  }
  async componentWillMount() {
    const request = await axios.get(
      "/api/tasks/fetch_comments/" + this.props.task_id
    );
    this.setState({ comments: request.data, loading: false });
  }
  async SubmitComment() {
    this.setState({ comment: "", loading: true });
    await axios.post("/api/tasks/create_comment", {
      task_id: this.props.task_id,
      comment: this.state.comment
    });
    const request = await axios.get(
      "/api/tasks/fetch_comments/" + this.props.task_id
    );
    this.setState({ comments: request.data, loading: false });
  }
  RenderMakeComment() {
    if (this.state.loading)
      return (
        <div className="make-comment">
          <div className="loader-small" />
        </div>
      );
    return (
      <div className="make-comment">
        <label>Comment:</label>
        <textarea
          className="form-control"
          rows="2"
          onChange={event => this.setState({ comment: event.target.value })}
          value={this.state.comment}
        />
        <button
          className="btn btn-primary"
          onClick={() => this.SubmitComment()}
        >
          Submit
        </button>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className="section">
          <i className="far fa-comment-dots" />
        </div>
        <CommentList comments={this.state.comments} />
        {this.RenderMakeComment()}
      </div>
    );
  }
}

export default Comments;
