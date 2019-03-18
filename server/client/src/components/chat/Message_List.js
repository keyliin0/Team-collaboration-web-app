import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { FetchChatMessages } from "../../actions";

class Message_List extends Component {
  constructor(props) {
    super(props);
    this.chatContainer = null;
    this.handleScroll = this.handleScroll.bind(this);
    this.assignChatContainerRef = this.assignChatContainerRef.bind(this);
    this.state = { ScrollBot: false };
  }
  componentDidUpdate() {
    // auto scroll when recieving a new message
    const node = ReactDOM.findDOMNode(this.chatContainer);
    if (this.state.ScrollBot) node.scrollTop = node.scrollHeight;
  }
  handleScroll() {
    const node = ReactDOM.findDOMNode(this.chatContainer);
    if (node.scrollHeight - node.scrollTop == node.clientHeight)
      this.setState({ ScrollBot: true });
    else if (this.state.ScrollBot) this.setState({ ScrollBot: false });
    if (node.scrollTop <= 25 && !this.props.chat.loading) {
      // fetch new messages on scroll
      this.props.FetchChatMessages(
        this.props.chat.selected_conv,
        this.props.chat.messages.length,
        5
      );
    }
  }
  assignChatContainerRef(target) {
    this.chatContainer = target;
  }
  RenderMessages() {
    const { messages } = this.props.chat;
    return _.map(messages, data => {
      if (data.author._id === this.props.user.id) {
        return (
          <li key={data._id} style={{ textAlign: "right", marginRight: "3%" }}>
            <div className="time">
              {moment(data.timestamp).format("hh:mm a")}
            </div>
            <div className="message me">{data.message}</div>
            <div className="image">
              <img
                height={40}
                width={40}
                src={data.author.imgURL}
                className="rounded-circle"
                alt=""
                title={data.author.firstname + " " + data.author.lastname}
              />
            </div>
          </li>
        );
      }
      return (
        <li key={data._id}>
          <div className="image">
            <img
              height={40}
              width={40}
              src={data.author.imgURL}
              className="rounded-circle"
              alt=""
              title={data.author.firstname + " " + data.author.lastname}
            />
          </div>
          <div className="message">{data.message}</div>
          <div className="time">{moment(data.timestamp).format("hh:mm a")}</div>
        </li>
      );
    });
  }
  render() {
    return (
      <div
        className="Message_List"
        ref={this.assignChatContainerRef}
        onScroll={event => this.handleScroll()}
      >
        {this.props.chat.loading ? <div className="loader" /> : ""}
        <ul>{this.RenderMessages()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ user, chat }) {
  return { user: user, chat: chat };
}

export default connect(
  mapStateToProps,
  { FetchChatMessages }
)(Message_List);
