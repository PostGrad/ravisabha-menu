import React from "react";
import { Link } from "react-router-dom";

function Menubar() {
  return (
    <div className="navbar bg-white py-4 shadow-md w-screen">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          BUPA Kitchen King
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">List of Events</Link>
          </li>{" "}
          <li>
            <Link to="/evententryform">Create New Event</Link>
          </li>
          <li tabIndex={0}>
            <a>
              Parent
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menubar;
