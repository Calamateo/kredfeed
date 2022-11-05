import React from "react";
import logo from "../global/assets/images/KredFeed-white.svg";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" width="70" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
