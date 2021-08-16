import React, { useState,useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";
import { authenticate, isAuth } from "./helpers";
import Google from "./Google";
import Facebook from "./Facebook";
import Appcontext from "../Components/RouterComponent/user/data/Appcontext"

const SignIn = (props) => {
  const {setDetails} = useContext(Appcontext);

  const [credit, setCredit] = useState({
    email: "",
    password: "",
    btnText: "Submit",
  });
  const { email, password, btnText } = credit;

  const handleChange = (name) => (event) => {
    setCredit({ ...credit, [name]: event.target.value });
  };

  const informParent = (response) => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? props.history.push("/admin")
        : props.history.push("/private");
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setCredit({ ...credit, btnText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log(response);
        authenticate(response, () => {
          setCredit({
            ...credit,
            email: "",
            password: "",
            btnText: "Submitted",
          });
          isAuth() && isAuth().role === "admin"
            ? props.history.push("/admin")
            : props.history.push("/private");
          //toast.success(`Hey, ${response.data.user.name}. Welcome Back`);
        });
      })
      .catch((error) => {
        console.log("Sign-in error", error.response.data);
        setCredit({ ...credit, btnText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signInForm = () => (
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
        {isAuth() ?  <Redirect to="/" />   : null}
        <h1 className="p-5 text-center">SignIn</h1>
        <Google informParent={informParent} />
        {/* <Facebook informParent={informParent} />  */}
        {signInForm()}
        <br />
        <Link
          className="btn btn-sm btn-outline-danger"
          to="/auth/forgot_password"
        >
          Forgot Password
        </Link>
      </div>
    </Layout>
  );
};

export default SignIn;
