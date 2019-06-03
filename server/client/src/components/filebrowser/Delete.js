import React, { Component } from "react";
import { connect } from "react-redux";
import { DeleteFile } from "../../actions";
import _ from "lodash";

class Delete extends Component {
  render() {
    if (!this.props.selected_file)
      return <i className="fas fa-trash icon disabled-icon" />;
    return (
      <div className="icon">
        <i
          className="fas fa-trash"
          onClick={() => this.props.DeleteFile(this.props.selected_file.id)}
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
  { DeleteFile }
)(Delete);
