import React from "react";
import Folders from "./Folders";
import Toolbox from "./toolbox/Toolbox";
import EmailList from "./EmailList";
import ReadEmail from "./read_email/ReadEmail";
import { Switch, Route } from "react-router-dom";
import { EmailList_PATH, ReadEmail_PATH, SendEmail_PATH } from "./RoutesVars";
import SendEmail from "./Send";

const Mails = () => {
  return (
    <div className="mails">
      <div className="float-left folders">
        <Folders />
      </div>
      <div className="content float-left">
        <Switch>
          <Route
            path={EmailList_PATH}
            render={props => (
              <div>
                <Toolbox />
                <EmailList />
              </div>
            )}
          />
          <Route path={ReadEmail_PATH} component={ReadEmail} />
          <Route path={SendEmail_PATH + "/:id"} component={SendEmail} />
          <Route path={SendEmail_PATH} component={SendEmail} />
        </Switch>
      </div>
      <div className="clear-fix" />
    </div>
  );
};

export default Mails;
