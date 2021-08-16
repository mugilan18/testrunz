import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { isAuth, signOut } from "../../authent/helpers";
//import Appcontext from "../../data/Appcontext"
import React, { useEffect, useState,useContext} from "react";

const style = {
  flexGrow: 1,
  marginLeft: "25px",
  cursor: "pointer",
};

const NavBar = (props) => {
  // const {ress} = useContext(Appcontext);

 
 
  

  return (
    <div>
      
      <AppBar>
        
        <Typography
          variant="h6"
          style={style}
          onClick={(event) => {
            window.localStorage.clear();
            return (window.location.href = "/");
          }}
        >
          TestRunz
         
        </Typography> 
        
        {/* 
        <span
          className="nav-link"
          style={{ cursor: "pointer", color: "white" }}
          onClick={() =>
            signOut(() => {
              console.log("his : ", window.history);
              //window.history.go(0);
            })
          }
        >
          SignOut
        </span>
         */}
      </AppBar>
     
    </div>
  );
};

export default NavBar;
