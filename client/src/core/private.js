import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Layout from "./Layout";
import { isAuth, getCookie, signOut, updateUserLS } from "../authent/helpers";

const Private = (props) => {
  const [credit, setCredit] = useState({
    designation: "",
    collegeName: "",
    department: "",
    country: "",
    state: "",
    year: "",
    semester: "",
    showOnce: false,
    btnText: "Submit",
  });
  const [goTo, setGoTo] = useState(false);
  
  useEffect(() => {
    loadProfile()
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
        const {
          designation,
          collegeName,
          department,
          country,
          state,
          year,
          semester,
          showOnce,
        } = response.data;
        setCredit({
          ...credit,
          designation,
          collegeName,
          department,
          country,
          state,
          year,
          semester,
          showOnce,
        });
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

  const {
    designation,
    collegeName,
    department,
    country,
    state,
    year,
    semester,
    btnText,
  } = credit;

  const handleChange = (name) => (event) => {
    setCredit({ ...credit, [name]: event.target.value, });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setCredit({ ...credit, btnText: "Submitting" });
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API}/users/update`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: {
        designation,
        collegeName,
        department,
        country,
        state,
        year,
        semester,
        showOnce:true,
      },
    })
      .then((response) => {
        updateUserLS(response, () => {
          setCredit({
            ...credit,
            designation: "",
            collegeName: "",
            department: "",
            country: "",
            state: "",
            year: "",
            semester: "",
            btnText: "Submitted",
            showOnce:true,
          });
          toast.success("Profile updated successful");
          setGoTo(() => true);
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
        <label className="text-muted">collegeName</label>
        <input
          onChange={handleChange("collegeName")}
          type="text"
          className="form-control"
          value={collegeName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">department</label>
        <input
          onChange={handleChange("department")}
          type="text"
          className="form-control"
          value={department}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">country</label>
        <input
          onChange={handleChange("country")}
          type="text"
          className="form-control"
          value={country}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">state</label>
        <input
          onChange={handleChange("state")}
          type="text"
          className="form-control"
          value={state}
        />
      </div>
      {credit.designation === "student" && (
        <>
          <div className="form-group">
            <label className="text-muted">year</label>
            <input
              onChange={handleChange("year")}
              type="text"
              className="form-control"
              value={year}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">semester</label>
            <input
              onChange={handleChange("semester")}
              type="text"
              className="form-control"
              value={semester}
            />
          </div>
        </>
      )}
      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {btnText}
        </button>
        <br />
        {goTo && (
          <button
            className="btn btn-primary"
            onClick={() => {
              props.history.push("/app");
            }}
          >
            App
          </button>
        )}
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="col-d-6 offset-md-3">
        <ToastContainer />
        {credit.showOnce && props.history.push("/app")}
        {(credit.showOnce === false) && (<> <p className="lead text-center">Profile Update</p>
        {updateForm()}</>)}
      </div>
    </Layout>
  );
};

export default Private;
