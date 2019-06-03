import React, { Component } from "react";
import Create_Folder from "./Create_Folder";
import Rename from "./Rename";
import Delete from "./Delete";
import Upload from "./Upload";

export default class FileBrowser extends Component {
  render() {
    return (
      <div className="toolbar">
        <i className="fas fa-angle-left icon" />
        <Create_Folder />
        <Upload />
        <Rename />
        <i className="fas fa-download icon" />
        <Delete />
      </div>
    );
  }
}
