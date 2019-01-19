import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

class Message_List extends Component {
  RenderMessages() {
    const { messages } = this.props;
    return _.map(messages, data => {
      if (data.sender_id === this.props.user.id) {
        return (
          <li style={{ textAlign: "right", marginRight: "3%" }}>
            <div className="message me">{data.message}</div>
            <div className="image">
              <img
                height={40}
                width={40}
                src={data.userIMG}
                class="rounded-circle"
                alt=""
                title="aa"
              />
            </div>
          </li>
        );
      }
      return (
        <li>
          <div className="image">
            <img
              height={40}
              width={40}
              src={data.userIMG}
              class="rounded-circle"
              alt=""
              title="aa"
            />
          </div>
          <div className="message">{data.message}</div>
        </li>
      );
    });
  }
  render() {
    return (
      <div className="Message_List">
        <ul>{this.RenderMessages()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ user, chat_messages }) {
  return { user: user, messages: chat_messages };
}

export default connect(mapStateToProps)(Message_List);
