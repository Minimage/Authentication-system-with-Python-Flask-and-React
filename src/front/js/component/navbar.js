import React, { useNavigate, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const redirect = () => {
    actions.logout();

    // actions.syncTokenFromSessionStore();
    // if (store.token === null) {
    //   navigate("/ratings");
    // }
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="btn btn-primary">Home</span>
        </Link>
        <div className="ml-auto">
          <Link to="/Login">
            <button className={store.token ? "hide" : " show btn btn-primary"}>
              Login
            </button>
          </Link>
          <Link to="/Signup">
            <button
              className={store.token ? "hide" : " show btn btn-primary"}
              style={{ marginLeft: "10px" }}
            >
              Signup
            </button>
          </Link>

          <Link to="private">
            <button
              className={!store.token ? "hide" : " show btn btn-primary"}
              style={{ marginLeft: "10px" }}
            >
              Private
            </button>
          </Link>
          <button
            className={!store.token ? "hide" : "show btn btn-primary"}
            style={{ marginLeft: "10px" }}
            onClick={() => {
              actions.logout();
              // <Link to={"/ratings"}>actions.logout()</Link>;
              // if (actions.logout()) {
              //   <Link to={"/ratings"}></Link>;
              // }
              // <Link to={"/ratings"}>
              //   actions.logout(),
              // </Link>;

              redirect();
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};
