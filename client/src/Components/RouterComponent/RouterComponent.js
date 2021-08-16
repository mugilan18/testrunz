import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../../Home";
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";
import UserDashComponent from "../DashBoard/DashBoard";
import ListProcedure from "./user/ProcedureList";
import AddProcedure from "./user/Procedure";
import EditProcedure from "./user/ProcedureEdit";

import Signup from "../../authent/signup";
import Signin from "../../authent/signin";
import Forgot from "../../authent/forgot";
import Reset from "../../authent/reset";
import Activate from "../../authent/activate";
import Private from "../../core/private";
import Admin from "../../core/admin";

import PrivateRoute from "../../authent/PrivateRoute";
import AdminRoute from "../../authent/AdminRoute";

import Appuserstate from "./user/data/Appuserstate"


const style = {
  marginTop: "20px",
};

const RouterComponent = () => {
  return (
    <div style={style}>
      <Appuserstate>
      <Router>
        <Switch>
          {/* <Route path="/auth/activate/:token" exact component={Activate} />
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/auth/forgot_password" component={Forgot} />
          <Route path="/auth/reset_password/:token" exact component={Reset} />
          <PrivateRoute path="/private" exact component={Private} />
          <AdminRoute path="/admin" exact component={Admin} /> */}
          <Route path="/" exact component={ListUserComponent} />
          <Route path="/add-user" exact component={AddUserComponent} />
          <Route path="/edit-user" component={EditUserComponent} />
          <Route path="/userdash/:token" component={UserDashComponent} />
          <Route path="/listProce" component={ListProcedure} />
          <Route path="/addProce" component={AddProcedure} />
          <Route path="/editProce/:id" component={EditProcedure} />
        </Switch>
      </Router>
      </Appuserstate>
    </div>
  );
};

export default RouterComponent;
