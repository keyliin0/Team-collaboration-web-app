import React, { Component } from "react";
import { connect } from "react-redux";
import { CreateFolder } from "../../actions";
import Modal from "react-responsive-modal";
import _ from "lodash";

class Create_Folder extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, name: "" };
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleClick() {
    if (this.state.name == "") return;
    this.props.CreateFolder(this.props.current_folder_id, this.state.name);
    this.setState({ name: "", open: false });
  }
  render() {
    const { open } = this.state;
    return (
      <div className="icon">
        <i className="fas fa-folder-plus" onClick={this.onOpenModal} />
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="create-folder-modal">
            <div className="header">
              <h5>Create a folder</h5>
            </div>
            <div className="name">
              <input
                placeholder=" "
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
              />
              <span>Name</span>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => this.handleClick()}
            >
              Save
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ files }) {
  return { current_folder_id: files.current_folder_id };
}

export default connect(
  mapStateToProps,
  { CreateFolder }
)(Create_Folder);
