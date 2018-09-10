import React from "react";

const SearchEmails = () => {
  return (
    <div>
      <div className="form-group">
        <input type="text" />
      </div>
      <i className="far fa-trash-alt" title="Delete" />
      <i className="far fa-envelope-open" title="Mark as unread" />
      <i className="far fa-envelope" title="Mark as read" />
    </div>
  );
};

export default SearchEmails;
