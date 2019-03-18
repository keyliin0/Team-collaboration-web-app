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
  renderGroups() {
    const { groups } = this.props;
    if (!groups) return <div className="loader" />;
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
            <div className="last_message">test test test</div>
          </div>
          <div className="last_message_date">3 min ago</div>
        </li>
      );
    });
  }
  render() {
    return <ul>{this.renderGroups()}</ul>;
  }
}

function mapStateToProps({ groups }) {
  return { groups: groups };
}

export default connect(
  mapStateToProps,
  { FetchGroups, JoinChatGroup, SelectChatConversation, FetchChatMessages }
)(Chat_List);
