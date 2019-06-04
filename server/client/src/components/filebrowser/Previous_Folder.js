import React, { Component } from "react";
import { connect } from "react-redux";
import { PreviousFolder } from "../../actions";
import _ from "lodash";

class Previous_Folder extends Component {
  render() {
    if (this.props.folders_history.length <= 1 || this.props.loading)
      return <i className="fas fa-angle-left icon disabled-icon" />;
    return (
      <div className="icon">
        <i
          className="fas fa-angle-left"
          onClick={() =>
            this.props.PreviousFolder(
              this.props.folders_history[this.props.folders_history.length - 2]
            )
          }
        />
      </div>
    );
  }
}

function mapStateToProps({ files }) {
  return { folders_history: files.folders_history, loading: files.loading };
}

export default connect(
  mapStateToProps,
  { PreviousFolder }
)(Previous_Folder);
