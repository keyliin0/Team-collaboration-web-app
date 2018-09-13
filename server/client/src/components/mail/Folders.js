import React from "react";
import { Link } from "react-router-dom";

const Folders = () => {
  return (
    <ul>
      <li className="compose">
        <button className="btn btn-primary">Compose</button>
      </li>
      <li>
        <Link to="/mail/INBOX/default">Inbox</Link>
      </li>

      <li>
        <Link to="/mail/SENT/default">Sent</Link>
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
