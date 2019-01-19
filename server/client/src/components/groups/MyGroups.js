import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchGroups } from "../../actions";
import GroupInfo from "./GroupInfo";
import _ from "lodash";

const default_img =
  "https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person";

class MyGroups extends Component {
  getgroups() {
    const { user } = this.props;
    return _.map(this.props.groups, group => {
      return (
        <GroupInfo
          key={group._id}
          id={group._id}
          owner={user.id === group._creator}
          name={group.name}
          img={group.imgURL === "" ? default_img : group.imgURL}
          instagram={group.instagram}
          facebook={group.facebook}
          twitter={group.twitter}
          email={group.email}
        />
      );
    });
  }
  componentDidMount() {
    this.props.FetchGroups();
  }
  render() {
    console.log(this.props.groups);
    if (!this.props.groups) return <div className="loader" />;
    if (_.isEmpty(this.props.groups))
      return <div className="empty_list">You are not in a group yet.</div>;
    return <div className="mygroups">{this.getgroups()}</div>;
  }
}

function mapStateToProps({ groups, user }) {
  return { groups, user };
}

export default connect(
  mapStateToProps,
  { FetchGroups }
)(MyGroups);
