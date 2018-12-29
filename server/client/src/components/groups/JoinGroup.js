import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import axios from "axios";
import { FetchGroups } from "../../actions";

class JoinGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, code: "", loading: false, error: false };
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  showError() {
    if (this.state.error)
      return (
        <div className="alert alert-danger" role="alert">
          Invalid invitation code
        </div>
      );
    else return <div />;
  }
  renderButton() {
    if (this.state.loading) return <div className="loader-small" />;
    return (
      <button className="btn btn-primary " onClick={event => this.onSubmit()}>
        Use
      </button>
    );
  }
  async onSubmit() {
    this.setState({ loading: true });
    const request = await axios.post("/api/group/join", {
      code: this.state.code
    });
    if (request.data === true) {
      await this.props.FetchGroups();
      this.setState({ open: false });
    } else this.setState({ error: true });
    this.setState({ loading: false });
  }
  render() {
    const { open } = this.state;
    return (
      <div style={{ display: "inline-block" }}>
        <button
          style={{ cursor: "pointer", margin: "10px" }}
          className="btn btn-primary"
          onClick={this.onOpenModal}
        >
          Use an invitation code
        </button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="join-modal">
            {this.showError()}
            <div className="input_field">
              <input
                placeholder=" "
                value={this.state.code}
                onChange={event => this.setState({ code: event.target.value })}
              />
              <span>Invitation code</span>
            </div>
            <i
              title="Paste"
              className="fas fa-paste"
              onClick={event =>
                navigator.clipboard
                  .readText()
                  .then(text => this.setState({ code: text }))
              }
            />
            {this.renderButton()}
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(
  mapStateToProps,
  { FetchGroups }
)(JoinGroup);
