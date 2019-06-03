import React, { Component } from "react";
import { connect } from "react-redux";
import { RenameFile } from "../../actions";
import Modal from "react-responsive-modal";
import _ from "lodash";

class Rename extends Component {
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
    this.props.RenameFile(this.props.selected_file.id, this.state.name);
    this.setState({ name: "", open: false });
  }
  render() {
    const { open } = this.state;
    if (!this.props.selected_file)
      return <i className="fas fa-edit icon disabled-icon" />;
    return (
      <div className="icon">
        <i className="fas fa-edit" onClick={this.onOpenModal} />
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="rename-modal">
            <div className="header">
              <h5>Rename</h5>
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
  return { selected_file: files.selected_file };
}

export default connect(
  mapStateToProps,
  { RenameFile }
)(Rename);
