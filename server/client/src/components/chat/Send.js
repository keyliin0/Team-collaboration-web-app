import React, { Component } from "react";
import { connect } from "react-redux";
import { SendChatMessage } from "../../actions";

class Send extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }
  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.props.SendChatMessage(this.props.group_id, this.state.message);
      this.setState({ message: "" });
    }
  }
  render() {
    return (
      <div className="send">
        <textarea
          onKeyUp={event => this.handleKeyPress(event)}
          className="message-to-send"
          placeholder="Type your message here…"
          value={this.state.message}
          onChange={event => this.setState({ message: event.target.value })}
          rows="3"
        />
      </div>
    );
  }
}

export default connect(
  null,
  { SendChatMessage }
)(Send);
