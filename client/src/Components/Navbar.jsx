import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <Link to="/retrieve-records">
          <li>All record</li>
        </Link>
        <Link to="/create-record">
          <li>Create record</li>
        </Link>
        <Link to="/update-record">
          <li>Update record</li>
        </Link>
        <Link to="/delete-record">
          <li>Delete record</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
