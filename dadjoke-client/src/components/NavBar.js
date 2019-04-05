import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

const NavBar = props => {
  return (
    <nav className="navbar">
      <NavLink to="/login">Login</NavLink>
      &nbsp; || &nbsp;
      {props.location.pathname === "/users" ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            props.history.push("/login");
          }}
        >
          Log Out
        </button>
      ) : (
        <NavLink to="/Jokes">Jokes</NavLink>
      )}
    </nav>
  );
};

export default withRouter(NavBar);
