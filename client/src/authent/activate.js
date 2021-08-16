import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";

const Activate = ({ match }) => {
  const [value, setValue] = useState({
    data_jwt: null,
    token: "",
    show: true,
  });
  useEffect(() => {
    let token = match.params.token;
    let data_jwt = jwt.decode(token);
    if (token) {
      setValue({ ...value, token, data_jwt });
    }
  }, [match.params.token]);

  const { data_jwt, token, show } = value;

  const clickSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account_activate`,
      data: {  data_jwt, token, show },
    })
      .then((response) => {
        console.log("Account activation res : ", response);
        setValue({
          ...value,
          show: false,
        });
        toast.success(`Hey, ${response.data.message}. succesfully saved`);
      })
      .catch((error) => {
        console.log("Account activation error", error);
        toast.error(error);
      });
  };
  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5"> Activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="col-d-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
