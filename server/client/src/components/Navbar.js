import React from "react";

const Navbar = () => {
  return (
    <div className="col col-lg-2 navbar">
      <div className="content">
        <div className="menu_list">
          <ul>
            <li>
              <button>
                <i className="octicon octicon-mail" />
                Mail
              </button>
            </li>
            <li>
              <button>
                <i className="octicon octicon-person" />
                People
              </button>
            </li>
            <li>
              <button>
                <i className="octicon octicon-organization" />
                Groups
              </button>
            </li>
            <li>
              <button>
                {" "}
                <i className="octicon octicon-calendar" />
                Calender
              </button>
            </li>
            <li>
              <button>
                <i className="octicon octicon-checklist" />
                Tasks
              </button>
            </li>
            <li>
              <button>
                {" "}
                <i className="octicon octicon-file-submodule" />
                Files
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
