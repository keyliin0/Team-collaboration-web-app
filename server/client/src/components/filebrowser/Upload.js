import React, { Component } from "react";
import { connect } from "react-redux";
import { UploadFile } from "../../actions";
import _ from "lodash";

class Upload extends Component {
  handleChange(event) {
    const file = event.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    this.props.UploadFile("root", formdata);
  }
  render() {
    if (this.props.upload_progress) {
      return <div className="icon">{this.props.upload_progress} %</div>;
    }
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
    upload_progress: files.upload_progress
  };
}

export default connect(
  mapStateToProps,
  { UploadFile }
)(Upload);
