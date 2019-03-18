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
      this.props.SendChatMessage(this.props.selected_conv, this.state.message);
      this.setState({ message: "" });
    }
  }
  render() {
    if (!this.props.selected_conv) return <div />;
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

function mapStateToProps({ chat }) {
  return { selected_conv: chat.selected_conv };
}

export default connect(
  mapStateToProps,
  { SendChatMessage }
)(Send);
