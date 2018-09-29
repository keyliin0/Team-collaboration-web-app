import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class Send extends Component {
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
            <button className="btn btn-primary">
              Send <i class="far fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Send;
