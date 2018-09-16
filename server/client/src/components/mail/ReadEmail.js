import React, { Component } from "react";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

class ReadEmail extends Component {
  render() {
    console.log(this.props.messages.emails);
    console.log(this.props.match.params.id);
    return (
      <div className="ReadEmail">
        <div className="subject">
          {this.props.messages.emails[this.props.match.params.id].subject}
        </div>
        <div className="info">
          <div className="from float-left">
            <div className="name">
              {this.props.messages.emails[this.props.match.params.id].name}
            </div>
            <div className="email">
              {this.props.messages.emails[this.props.match.params.id].from}
            </div>
          </div>
          <div className="date float-right">
            {this.props.messages.emails[this.props.match.params.id].date}
          </div>
        </div>
        <div className="clearfix" />
        <div className="content">
          {ReactHtmlParser(
            this.props.messages.emails[this.props.match.params.id].content
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ emails }) {
  return { messages: emails };
}

export default connect(mapStateToProps)(ReadEmail);
