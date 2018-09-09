import React from "react";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="head" />
      <div className="content">
        <ul>
          <li>
            <button>
              <i className="fas fa-home" />
              Home
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-envelope" />
              Inbox
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-file-invoice" />
              Files
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-tasks" />
              Tasks
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-users" />
              Groups
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-comment-alt" />
              Chat room
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-calendar-alt" />
              Calender
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
