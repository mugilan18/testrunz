import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";
import { isAuth } from "./helpers";

const SignUp = () => {
  const [credit, setCredit] = useState({
    name: "",
    email: "",
    password: "",
    btnText: "Submit",
  });
  const { name, email, password, btnText } = credit;

  const handleChange = (name) => (event) => {
    setCredit({ ...credit, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setCredit({ ...credit, btnText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log(response);
        setCredit({
          ...credit,
          name: "",
          email: "",
          password: "",
          btnText: "Submitted",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Sign-up error", error.response.data);
        setCredit({ ...credit, btnText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {btnText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="col-d-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="p-5 text-center">Signup</h1>
        {signUpForm()}
      </div>
    </Layout>
  );
};

export default SignUp;
