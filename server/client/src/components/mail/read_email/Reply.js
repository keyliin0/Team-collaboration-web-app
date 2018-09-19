import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Reply extends Component {
  render() {
    return <i class="fas fa-reply" title="Reply" />;
  }
}

export default withRouter(Reply);
