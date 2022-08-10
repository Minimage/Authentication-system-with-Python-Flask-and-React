import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <form className="center">
      <div className="form-outline mb-4">
        <input type="email" id="form2Example1" className="form-control" />
        <label className="form-label" for="form2Example1">
          Email address
        </label>
      </div>

      <div className="form-outline mb-4">
        <input type="password" id="form2Example2" className="form-control" />
        <label className="form-label" for="form2Example2">
          Password
        </label>
      </div>

      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          {" "}
          <button type="button" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
        </div>
        {/* 
        <div className="col">
          <a href="#!">Forgot password?</a>
        </div> */}
      </div>

      <div className="text-center">
        <Link to="/Signup">
          <p>
            Not a member? <a href="#!">Register</a>
          </p>
        </Link>
      </div>
    </form>
  );
};
