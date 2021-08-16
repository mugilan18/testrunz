import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";

const Reset = (props) => {
  const [credit, setCredit] = useState({
    name: "",
    resetPasswordLink: "",
    newPassword: "",
    btnText: "Reset password",
  });
  useEffect(() => {
    let token = props.match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setCredit({ ...credit, name, resetPasswordLink: token });
    }
  }, []);

  const { name, resetPasswordLink, newPassword, btnText } = credit;

  console.log(credit);
  const handleChange = (name) => (event) => {
    setCredit({ ...credit, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setCredit({ ...credit, btnText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/reset_password`,
      data: { resetPasswordLink, newPassword },
    })
      .then((response) => {
        console.log(response);
        toast.success(`${response.data.message}.`);
        setCredit({ ...credit, btnText: "Done" });
      })
      .catch((error) => {
        console.log("Sign-in error", error.response.data);
        toast.error(error.response.data.error);
        setCredit({ ...credit, btnText: "Reset password" });
      });
  };

  const resetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">new password for {name}</label>
        <input
          onChange={handleChange("newPassword")}
          type="password"
          className="form-control"
          value={newPassword}
          required
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
        <h1 className="p-5 text-center">Reset password</h1>
        {resetForm()}
      </div>
    </Layout>
  );
};

export default Reset;
