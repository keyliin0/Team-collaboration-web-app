import React, { Component } from "react";
import { connect } from "react-redux";
import { UploadFile } from "../../actions";
import _ from "lodash";

class Upload extends Component {
  handleChange(event) {
    const file = event.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    this.props.UploadFile(this.props.current_folder_id, formdata);
  }
  render() {
    if (this.props.upload_progress !== null) {
      return <div className="icon">{this.props.upload_progress} %</div>;
    }
    if (this.props.loading)
      return (
        <div className="icon">
          <i className="fas fa-cloud-upload-alt disabled-icon" />
        </div>
      );
    return (
      <div className="icon">
        <label htmlFor="file">
          <i className="fas fa-cloud-upload-alt icon" />
        </label>
        <input
          style={{ display: "none" }}
          id="file"
          type="file"
          onChange={event => this.handleChange(event)}
        />
      </div>
    );
  }
}

function mapStateToProps({ files }) {
  return {
    current_folder_id: files.current_folder_id,
    upload_progress: files.upload_progress,
    loading: files.loading
  };
}

export default connect(
  mapStateToProps,
  { UploadFile }
)(Upload);
