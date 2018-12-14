import React, { Component } from "react";

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      instagram: "",
      twitter: "",
      facebook: "",
      email: "",
      imgurl: ""
    };
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
              src="https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person"
              alt=""
              width="100"
              height="100"
            />
            <div className="input_field">
              <input
                placeholder=" "
                value={this.state.imgurl}
                onChange={event =>
                  this.setState({ imgurl: event.target.value })
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
          <button disabled className="btn btn-primary">
            Save <i className="fas fa-save" />
          </button>
        </div>
      </div>
    );
  }
}

export default EditGroup;
