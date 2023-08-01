import React from "react";
import { Link } from "react-router-dom";
import EventList from "./EventList";

function Menubar() {
  return (
    <div className="navbar bg-base-100 w-screen">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Event List</Link>
            </li>
            {/* <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li> */}
            <li>
              <Link to="/evententryform">New Event</Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          BUPA Kitchen
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Event List</Link>
          </li>
          {/* <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
          <li>
            <Link to="/evententryform">New Event</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-error">Log Out</a>
      </div>
    </div>
  );
}

export default Menubar;
