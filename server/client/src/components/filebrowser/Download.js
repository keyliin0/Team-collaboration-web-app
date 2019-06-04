import React, { Component } from "react";
import { connect } from "react-redux";
import { DownloadFile } from "../../actions";
import _ from "lodash";

class Download extends Component {
  render() {
    if (!this.props.selected_file || this.props.selected_file.type !== "file")
      return <i className="fas fa-download icon disabled-icon" />;
    return (
      <div className="icon">
        <i
          className="fas fa-download"
          onClick={() =>
            this.props.DownloadFile(
              this.props.selected_file.id,
              this.props.selected_file.name
            )
          }
        />
      </div>
    );
  }
}

function mapStateToProps({ files }) {
  return { selected_file: files.selected_file };
}

export default connect(
  mapStateToProps,
  { DownloadFile }
)(Download);
