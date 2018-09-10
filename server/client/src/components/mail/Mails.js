import React from "react";
import Folders from "./Folders";
import SearchEmails from "./SearchEmails";
import EmailList from "./EmailList";

const Mails = () => {
  return (
    <div className="mails">
      <div className="float-left folders">
        <Folders />
      </div>
      <div className="content float-left">
        <div className="SearchBar">
          <SearchEmails />
        </div>
        <div className="EmailList">
          <EmailList />
        </div>
      </div>
      <div className="clear-fix" />
    </div>
  );
};

export default Mails;
