import React from "react";

const Folders = () => {
  return (
    <ul>
      <li className="compose">
        <button className="btn btn-primary">Compose</button>
      </li>
      <li>
        <a href="#">Inbox</a>
      </li>

      <li>
        <a href="#">Sent</a>
      </li>

      <li>
        <a href="#">Drafts</a>
      </li>

      <li>
        <a href="#">Spam</a>
      </li>
      <li>
        <a href="#">Trash</a>
      </li>
    </ul>
  );
};

export default Folders;
