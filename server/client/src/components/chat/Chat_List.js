import React, { Component } from "react";
import { connect } from "react-redux";
import {
  FetchGroups,
  JoinChatGroup,
  SelectChatConversation,
  FetchChatMessages
} from "../../actions";
import _ from "lodash";

class Chat_List extends Component {
  componentWillMount() {
    this.props.FetchGroups().then(() => {
      const { groups } = this.props;
      _.map(groups, group => {
        this.props.JoinChatGroup(group._id);
      });
    });
  }
  HandleClick(group_id, name, imgURL) {
    this.props.SelectChatConversation(group_id, name, imgURL);
    this.props.FetchChatMessages(group_id, 0, 15);
  }
  ShowDate(date) {
    var now = Date.now();
    const d = new Date(now - date);
    if (now - date < 1000) return "Now";
    if (now - date < 60 * 1000) return d.getSeconds() + " Sec. ago";
    else if (now - date < 60 * 60 * 1000) return d.getMinutes() + " Min. ago";
    else if (now - date < 60 * 60 * 24 * 1000)
      return d.getHours() + " Hrs. ago";
    else if (now - date < 60 * 60 * 24 * 30 * 1000)
      return d.getDay() + " Days ago.";
    else if (now - date < 60 * 60 * 24 * 30 * 12 * 1000)
      return d.getMonth() + " Mon. ago";
    else return d.getFullYear() + " Years ago";
  }
  renderGroups() {
    // sort groups by recent activity
    const groups = _.sortBy(
      this.props.groups,
      o => -o.last_chat_message.timestamp
      // minus to sort using an desc order
    );
    if (!this.props.groups) return <div className="loader" />;
    if (_.isEmpty(groups))
      return (
        <div style={{ fontWeight: "bold", textAlign: "center" }}>
          You are not in a group yet.
        </div>
      );
    return _.map(groups, group => {
      return (
        <li
          key={group._id}
          onClick={event =>
            this.HandleClick(group._id, group.name, group.imgURL)
          }
          className={this.props.selected_conv === group._id ? "active" : ""}
        >
          <div className="image">
            <img
              src={group.imgURL}
              height={40}
              width={40}
              className="rounded-circle"
            />
          </div>
          <div className="info">
            <div className="name">{group.name}</div>
            <div className="last_message">
              {group.last_chat_message.message}
            </div>
          </div>
          <div className="last_message_date">
            {this.ShowDate(group.last_chat_message.timestamp)}
          </div>
        </li>
      );
    });
  }
  render() {
    return <ul>{this.renderGroups()}</ul>;
  }
}

function mapStateToProps({ chat, groups }) {
  return { groups: groups, selected_conv: chat.selected_conv };
}

export default connect(
  mapStateToProps,
  { FetchGroups, JoinChatGroup, SelectChatConversation, FetchChatMessages }
)(Chat_List);
