import React from "react";
import axios from "axios";

const Logout = () => {
  return (
    <li>
      {" "}
      <a href="/api/logout">
        <i className="fas fa-sign-out-alt" />
      </a>
    </li>
  );
};

export default Logout;
