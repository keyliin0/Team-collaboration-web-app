import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { SendEmail_PATH } from "../RoutesVars";

class Reply extends Component {
  render() {
    return (
      <i
        class="fas fa-reply"
        title="Reply"
        onClick={() =>
          this.props.history.push(
            SendEmail_PATH + "/" + this.props.match.params.id
          )
        }
      />
    );
  }
}

export default withRouter(Reply);
