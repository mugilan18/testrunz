import React from "react";
import { Link } from "react-router-dom";
import "./App.module.css";
import Layout from "./core/Layout";

function Home() {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="card" style={{ width: "40rem" }}>
          <div className="card-body">
            <h5 className="card-title">About Testrunz</h5>
            <h6 className="card-subtitle mb-2 text-muted">To Start</h6>
            <p className="card-text">
              This app is about connecting student and academecian to have best
              experience with Laboratory
            </p>
            <Link to="/signup" className="card-link">
              Sign Up
            </Link>
            <Link to="/signin" className="card-link">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
