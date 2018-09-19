import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Back extends Component {
  render() {
    return (
      <i
        class="fas fa-long-arrow-alt-left"
        title="go back"
        onClick={() => this.props.history.goBack()}
      />
    );
  }
}

export default withRouter(Back);
