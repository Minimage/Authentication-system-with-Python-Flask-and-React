import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  let history = useNavigate();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  // const history = useHistory();
  const token = sessionStorage.getItem("token");

  const handleClick = () => {
    actions.login(userName, password);
    if (store.token && store.token !== null && store.token !== undefined) {
      setUserName("");
      setPassword("");
    } else {
      alert("Welcome to our page");
    }
  };

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (store.token) {
      navigate("/");
    }
  });

  return (
    <form className="center">
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        required
      ></input>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      ></input>
      <div id="submit_button">
        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={handleClick}
          style={{ width: "200px" }}
        >
          Login
        </button>
      </div>
    </form>
  );
};
