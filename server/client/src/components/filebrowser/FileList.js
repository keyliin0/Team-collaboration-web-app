import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchFiles, FetchGroups, SelectFile } from "../../actions";
import _ from "lodash";

class FileList extends Component {
  componentWillMount() {
    // get root folder id of the group
    const { group_id, groups } = this.props;
    if (!groups) {
      // if groups are not loaded, load them then fetch files
      this.props.FetchGroups().then(() => {
        const { group_id, groups } = this.props;
        this.props.FetchFiles(groups[group_id].storage_folder_id);
      });
    } else this.props.FetchFiles(groups[group_id].storage_folder_id);
  }
  RenderFolders() {
    return _.map(this.props.files.objects, folder => {
      const date = folder.modified.split("T")[0];
      const time = folder.modified.split("T")[1].split(".")[0];
      if (folder.type === "folder")
        return (
          <div
            className={
              "row item " +
              (folder === this.props.files.selected_file ? "selected" : "")
            }
            key={folder.id}
            onClick={() => this.props.SelectFile(folder)}
            onDoubleClick={() => this.props.FetchFiles(folder.id)}
          >
            <div className="col-5 title">
              <div className="icon">
                <i className="fas fa-folder" />
              </div>
              <div className="name">{folder.name}</div>
            </div>
            <div className="col-3 size"> - </div>
            <div className="col-4 modified">{date + " " + time}</div>
          </div>
        );
    });
  }
  RenderFiles() {
    return _.map(this.props.files.objects, file => {
      const date = file.modified.split("T")[0];
      const time = file.modified.split("T")[1].split(".")[0];
      if (file.type === "file")
        return (
          <div
            className={
              "row item " +
              (file === this.props.files.selected_file ? "selected" : "")
            }
            key={file.id}
            onClick={() => this.props.SelectFile(file)}
          >
            <div className="col-5 title">
              <div className="icon">
                <i className="fas fa-file" />
              </div>
              <div className="name">{file.name}</div>
            </div>
            <div className="col-3 size">{(file.size / 1024).toFixed(2)} KB</div>
            <div className="col-4 modified">{date + " " + time}</div>
          </div>
        );
    });
  }
  render() {
    if (this.props.files.loading)
      return (
        <div className="list">
          <div className="loader" />
        </div>
      );
    return (
      <div className="list">
        {this.RenderFolders()}
        {this.RenderFiles()}
      </div>
    );
  }
}

function mapStateToProps({ files, groups }) {
  return { files: files, groups: groups };
}

export default connect(
  mapStateToProps,
  { FetchGroups, FetchFiles, SelectFile }
)(FileList);
