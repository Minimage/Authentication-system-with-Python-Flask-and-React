import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const PrivatePage = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  console.log(store);

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!store.token) {
      navigate("/login");
    }
  }, [store.token]);

  if (store.token && store.token !== undefined && store.token !== null) {
    return (
      <div>
        <h1>Private Stuff</h1>
      </div>
    );
  } else {
    return <div></div>;
  }
};
