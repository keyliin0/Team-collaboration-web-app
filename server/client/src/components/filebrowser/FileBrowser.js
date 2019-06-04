import React, { Component } from "react";
import FileList from "./FileList";
import Header from "./Header";
import Toolbar from "./Toolbar";
import Location from "./Location";

export default class FileBrowser extends Component {
  render() {
    return (
      <div className="filebrowser-container col-6">
        <Toolbar />
        <Header />
        <FileList group_id={this.props.match.params.id} />
        <Location group_id={this.props.match.params.id} />
      </div>
    );
  }
}
