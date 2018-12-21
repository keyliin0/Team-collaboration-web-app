import React, { Component } from "react";
import { connect } from "react-redux";
import { CreateGroup } from "../../actions";
import { MyGroups_PATH } from "./RoutesVars";

const default_img =
  "https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person";

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      instagram: "",
      twitter: "",
      facebook: "",
      email: "",
      imgURL: ""
    };
  }
  handleSubmit() {
    this.props
      .CreateGroup(
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
            Create <i className="far fa-plus-square" />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { CreateGroup }
)(NewGroup);
