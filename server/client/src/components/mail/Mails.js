import React from "react";
import Folders from "./Folders";
import Toolbox from "./Toolbox";
import EmailList from "./EmailList";

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

        <EmailList />
      </div>
      <div className="clear-fix" />
    </div>
  );
};

export default Mails;
