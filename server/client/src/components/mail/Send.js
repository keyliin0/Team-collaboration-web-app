import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Send extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    this.props.Send_Email("test@gmail.com", "test test", "content test");
  }
  render() {
    return (
      <div className="SendEmail">
        <div className="content">
          <div className="to">
            <input placeholder=" " />
            <span>Recipients</span>
          </div>
          <div className="subject">
            <input placeholder=" " />
            <span>Subject</span>
          </div>
          <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
          <div className="send-btn">
            <button
              onClick={() => this.handleClick()}
              className="btn btn-primary"
            >
              Send <i className="far fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Send);
