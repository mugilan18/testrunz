import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import Layout from "./Layout";
import { isAuth, getCookie, signOut, updateUserLS } from "../authent/helpers";

const Admin = (props) => {
  const [credit, setCredit] = useState({
    designation: "",
    name: "",
    password: "",
    btnText: "Submit",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/users/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => {
        console.log("Private profile", response);
        const { designation, name } = response.data;
        setCredit({ ...credit, designation, name });
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.status === 401) {
          signOut(() => {
            props.history.push("/");
          });
        }
      });
  };

  const { designation, name, password, btnText } = credit;

  const handleChange = (name) => (event) => {
    setCredit({ ...credit, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setCredit({ ...credit, btnText: "Submitting" });
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API}/admin/update`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: { designation, name, password },
    })
      .then((response) => {
        console.log(response);
        updateUserLS(response, () => {
          setCredit({
            ...credit,
            designation: "",
            name: "",
            password: "",
            btnText: "Submitted",
          });
          toast.success("Profile updated successful");
        });
      })
      .catch((error) => {
        console.log("Sign-up error", error.response.data);
        setCredit({ ...credit, btnText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const updateForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Designation</label>
        <input
          onChange={handleChange("designation")}
          type="text"
          className="form-control"
          value={designation}
        />
      </div>
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
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
          disabled
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
        <h1 className="p-5 text-center">Admin</h1>
        <p className="lead text-center">Profile Update</p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Admin;
