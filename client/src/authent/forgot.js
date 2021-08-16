import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";

const Forgot = (props) => {
  const [credit, setCredit] = useState({
    email: "",
    btnText: "Request Password Reset Link",
  });
  const { email, btnText } = credit;

  const handleChange = (name) => (event) => {
    setCredit({ ...credit, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setCredit({ ...credit, btnText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot_password`,
      data: { email },
    })
      .then((response) => {
        console.log(response);
        toast.success(`${response.data.message}.`);
        setCredit({ ...credit, btnText: "Requested" });
      })
      .catch((error) => {
        console.log("Sign-in error", error.response.data);
        toast.error(error.response.data.error);
        setCredit({ ...credit, btnText: "Request Password Reset Link" });
      });
  };

  const forgotForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
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
        <h1 className="p-5 text-center">Forgot password</h1>
        {forgotForm()}
      </div>
    </Layout>
  );
};

export default Forgot;
