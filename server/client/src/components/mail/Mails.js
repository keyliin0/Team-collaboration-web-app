import React from "react";
import Folders from "./Folders";
import Toolbox from "./Toolbox";
import EmailList from "./EmailList";
import ReadEmail from "./ReadEmail";
import { Switch, Router, Route } from "react-router-dom";

const Mails = () => {
  return (
    <div className="mails">
      <div className="float-left folders">
        <Folders />
      </div>
      <div className="content float-left">
        <div className="Toolbox">
          <Toolbox />
        </div>
        <Switch>
          <Route path="/mail/list" component={EmailList} />
          <Route path="/mail/read/:id" component={ReadEmail} />
        </Switch>
      </div>
      <div className="clear-fix" />
    </div>
  );
};

export default Mails;
