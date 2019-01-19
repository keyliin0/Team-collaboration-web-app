import React, { Component } from "react";
import { connect } from "react-redux";
import Chat_List from "./Chat_List";
import Selected_Conv from "./Selected_Conv";
import Message_List from "./Message_List";
import Send from "./Send";

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = { selected_conv: null };
  }
  ChangeConversation(id, name, imgurl) {
    this.setState({ selected_conv: { id: id, name: name, imgurl: imgurl } });
  }
  render() {
    return (
      <div className="Chatroom col col-10 h-75">
        <div className="chat_list float-left">
          <Chat_List ChangeConversation={this.ChangeConversation.bind(this)} />
        </div>
        {this.state.selected_conv ? (
          <div className="info clearfix">
            <Selected_Conv conv={this.state.selected_conv} />
            <Message_List />
            <Send group_id={this.state.selected_conv.id} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Chatroom;
