import React, { Component } from "react";
import Modal from "react-responsive-modal";
import axios from "axios";

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, code: null, loading: false };
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  async GenerateCode() {
    this.setState({ loading: true });
    const request = await axios.post("/api/group/invite", {
      group_id: this.props.id
    });
    this.setState({ code: request.data, loading: false });
  }
  RenderCode() {
    if (!this.state.code) return <div />;
    return (
      <div>
        <div className="code">{this.state.code}</div>
        <i
          className="fas fa-copy"
          onClick={event => navigator.clipboard.writeText(this.state.code)}
          title="Copy"
        />
      </div>
    );
  }
  renderButton() {
    if (this.state.loading) return <div className="loader-small" />;
    return (
      <button
        className="btn btn-primary"
        onClick={event => this.GenerateCode()}
      >
        Generate
      </button>
    );
  }
  render() {
    const { open } = this.state;
    return (
      <div style={{ display: "inline-block" }}>
        <i onClick={this.onOpenModal} className="fas fa-plus" />
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="invite-modal">
            Generate an invitation code. Any code created before will no longer
            be valid.
            <div className="button">{this.renderButton()}</div>
            {this.RenderCode()}
          </div>
        </Modal>
      </div>
    );
  }
}

export default Invite;
