import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signOut } from "../authent/helpers";
import "../App.module.css";
function Layout(props) {
  const isActive = (path) => {
    if (props.match.path === path) {
      return { color: "#000" };
    } else {
      return { color: "#fff" };
    }
  };
  const nav = () => (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isAuth() && (
              <>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="nav-link"
                    style={isActive("/signup")}
                  >
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signin"
                    className="nav-link"
                    style={isActive("/signin")}
                  >
                    SignIn
                  </Link>
                </li>
              </>
            )}
            {isAuth() && isAuth().role === "admin" && (
              <li className="nav-item">
                <Link
                  to="/admin"
                  className="nav-link"
                  style={{ cursor: "pointer", color: "white" }}
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            {isAuth() && (
              <li className="nav-item">
                <Link
                  to="/private"
                  className="nav-link"
                  style={{ cursor: "pointer", color: "white" }}
                >
                  Profile Setup
                </Link>
              </li>
            )}
            {isAuth() && (
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={() =>
                    signOut(() => {
                      props.history.push("/");
                    })
                  }
                >
                  SignOut
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container">{props.children}</div>
    </Fragment>
  );
}

export default withRouter(Layout);
