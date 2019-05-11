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
          name={group.name}
          img={group.imgURL === "" ? default_img : group.imgURL}
        />
      );
    });
  }
  componentDidMount() {
    this.props.FetchGroups();
  }
  render() {
    if (!this.props.groups) return <div className="loader" />;
    if (_.isEmpty(this.props.groups))
      return (
        <div className="calendar-mygroups col col-10 h-75">
          <div>Select a group</div>
          <div className="empty_list">You are not in a group yet.</div>
        </div>
      );
    return (
      <div className=" calendar-mygroups col col-10 h-75">
        {" "}
        <div className="title">Select a group</div>
        {this.getgroups()}
      </div>
    );
  }
}

function mapStateToProps({ groups }) {
  return { groups };
}

export default connect(
  mapStateToProps,
  { FetchGroups }
)(MyGroups);
