import React, { Component } from "react";
import Create_Folder from "./Create_Folder";
import Rename from "./Rename";
import Delete from "./Delete";
import Upload from "./Upload";
import Download from "./Download";
import Previous_Folder from "./Previous_Folder";

export default class FileBrowser extends Component {
  render() {
    return (
      <div className="toolbar">
        <Previous_Folder />
        <Create_Folder />
        <Upload />
        <Rename />
        <Download />
        <Delete />
      </div>
    );
  }
}
