import React from "react";
import Notifications from "./Notifications";
import UserInfo from "./UserInfo";
import Logout from "./Logout";

const Utils = () => {
  return (
    <div className="Utils">
      <div className="right float-right">
        <ul>
          <Logout />
          <Notifications />
          <li>
            <hr />
          </li>
          <UserInfo />
        </ul>
      </div>
    </div>
  );
};

export default Utils;
