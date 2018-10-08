import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { EmailList_PATH } from "./RoutesVars";

class Send extends Component {
  constructor(props) {
    super(props);
    if (
      this.props.match.params.id &&
      this.props.messages.emails &&
      this.props.messages.emails[this.props.match.params.id]
    )
      this.state = {
        content: "",
        to: this.props.messages.emails[this.props.match.params.id].from,
        subject: this.props.messages.emails[this.props.match.params.id].subject
      };
    else this.state = { content: "", to: "", subject: "" };
  }
  handleClick() {
    this.props.Send_Email(
      this.state.to,
      this.state.subject,
      this.state.content
    );
    this.props.history.push(EmailList_PATH);
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  handleToChange(event) {
    this.setState({ to: event.target.value });
  }
  handleSubjectChange(event) {
    this.setState({ subject: event.target.value });
  }
  onEditorStateChange(editorState) {
    this.setState({
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  }
  render() {
    return (
      <div className="SendEmail">
        <div className="content">
          <div className="to">
            <input
              placeholder=" "
              value={this.state.to}
              onChange={event => this.handleToChange(event)}
            />
            <span>Recipients</span>
          </div>
          <div className="subject">
            <input
              placeholder=" "
              value={this.state.subject}
              onChange={event => this.handleSubjectChange(event)}
            />
            <span>Subject</span>
          </div>
          <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={editorState =>
              this.onEditorStateChange(editorState)
            }
          />
          <div className="send-btn">
            {this.validateEmail(this.state.to) &&
            this.state.subject !== "" &&
            this.state.content !== "" ? (
              <button
                onClick={() => this.handleClick()}
                className="btn btn-primary"
              >
                Send <i className="far fa-paper-plane" />
              </button>
            ) : (
              <button disabled className="btn btn-primary">
                Send <i className="far fa-paper-plane" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ emails }) {
  return { messages: emails };
}

export default connect(
  mapStateToProps,
  actions
)(Send);
