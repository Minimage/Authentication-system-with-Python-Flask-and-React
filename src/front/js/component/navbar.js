import React, { useNavigate } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/Login">
            <button className="btn btn-primary">Login</button>
          </Link>
          <Link to="/Signup">
            <button className="btn btn-primary" style={{ marginLeft: "10px" }}>
              Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
