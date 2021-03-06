import React, { Component } from "react";
import { connect } from "react-redux";
import { ModifyGroup } from "../../actions";
import { MyGroups_PATH } from "./RoutesVars";

const default_img =
  "https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person";

class EditGroup extends Component {
  constructor(props) {
    super(props);
    if (!this.props.groups || !this.props.groups[this.props.match.params.id])
      this.props.history.push(MyGroups_PATH);
    const id = this.props.match.params.id;
    if (this.props.groups && this.props.groups[id]) {
      this.state = {
        name: this.props.groups[id].name,
        description: "",
        instagram: this.props.groups[id].instagram,
        twitter: this.props.groups[id].twitter,
        facebook: this.props.groups[id].facebook,
        email: this.props.groups[id].email,
        imgURL: this.props.groups[id].imgURL
      };
    }
  }
  handleSubmit() {
    this.props
      .ModifyGroup(
        this.props.match.params.id,
        this.state.name,
        this.state.imgURL,
        this.state.instagram,
        this.state.twitter,
        this.state.facebook,
        this.state.email
      )
      .then(() => this.props.history.push(MyGroups_PATH));
  }
  render() {
    // if the user tryed to copy paste the link without loading data to the state
    if (!this.props.groups || !this.props.groups[this.props.match.params.id])
      return <div />;
    return (
      <div className="modify h-100">
        <div className="row">
          <div className="col-6">
            <div className="input_field">
              <input
                placeholder=" "
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
              />
              <span>
                <i className="fas fa-user-tag" />
                Name
              </span>
            </div>
            <div className="input_field">
              <input
                placeholder=" "
                value={this.state.description}
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
              />
              <span>Description</span>
            </div>
            <div className="input_field">
              <input
                placeholder=" "
                value={this.state.instagram}
                onChange={event =>
                  this.setState({ instagram: event.target.value })
                }
              />
              <span>
                <i className="fab fa-instagram" />
                Instagram
              </span>
            </div>
            <div className="input_field">
              <input
                placeholder=" "
                value={this.state.twitter}
                onChange={event =>
                  this.setState({ twitter: event.target.value })
                }
              />
              <span>
                <i className="fab fa-twitter" />
                Twitter{" "}
              </span>
            </div>
            <div className="input_field">
              <input
                placeholder=" "
                value={this.state.facebook}
                onChange={event =>
                  this.setState({ facebook: event.target.value })
                }
              />
              <span>
                {" "}
                <i className="fab fa-facebook-f" />
                Facebook
              </span>
            </div>
            <div className="input_field">
              <input
                placeholder=" "
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
              />
              <span>
                {" "}
                <i className="far fa-envelope" />
                Email
              </span>
            </div>
          </div>
          <div className="col-6">
            <img
              className="rounded-circle"
              src={default_img}
              alt=""
              width="100"
              height="100"
            />
            <div className="input_field">
              <input
                placeholder=" "
                value={this.state.imgURL}
                onChange={event =>
                  this.setState({ imgURL: event.target.value })
                }
              />
              <span>
                {" "}
                <i className="far fa-id-card" />
                Image URL
              </span>
            </div>
          </div>
        </div>
        <div>
          <button
            style={{ cursor: "pointer" }}
            className="btn btn-primary"
            onClick={event => this.handleSubmit()}
          >
            Save <i className="fas fa-save" />
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ groups }) {
  return { groups };
}

export default connect(
  mapStateToProps,
  { ModifyGroup }
)(EditGroup);
