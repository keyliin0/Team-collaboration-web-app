import React, { Component } from "react";
import { connect } from "react-redux";
import Chat_List from "./Chat_List";
import Selected_Conv from "./Selected_Conv";
import Message_List from "./Message_List";
import Send from "./Send";

class Chatroom extends Component {
  render() {
    return (
      <div className="Chatroom col col-10 h-75">
        <div className="chat_list float-left">
          <Chat_List />
        </div>
        <div className="info clearfix">
          <Selected_Conv />
          <Message_List />
          <Send />
        </div>
      </div>
    );
  }
}

export default Chatroom;
