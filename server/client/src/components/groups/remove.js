import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import { DeleteGroup, FetchGroups } from "../../actions";

class Remove extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  onRemove() {
    this.props.DeleteGroup(this.props.id);
  }
  render() {
    const { open } = this.state;
    return (
      <div style={{ display: "inline-block" }}>
        <i onClick={this.onOpenModal} className="fas fa-times" />
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="remove-modal">
            <p>You are about to leave this group. </p>
            <p>
              <b>
                Please note that if you're the group owner, the group will be
                deleted.
              </b>
            </p>
            <br />
            <div className="buttons">
              <button
                className="btn btn-primary Yes"
                onClick={event => this.onRemove()}
              >
                Yes
              </button>
              <button
                className="btn btn-danger No"
                onClick={event => this.onCloseModal()}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  { DeleteGroup, FetchGroups }
)(Remove);
