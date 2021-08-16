//import { isAuth, signOut } from "../../../../authent/helpers";
import Appcontext from "./data/Appcontext"
import React, { useContext } from "react";

const Userprofile = () => {
    const {details} = useContext(Appcontext);

    return (
        <>{details && (
            <>
            <span>name:</span> 
            <span>{details.name}</span>
            <br/>
           
            <span>email:</span> 
            <span>{details.email}</span>
            </>
        )
          }  
  
        </>
    )
}

export default Userprofile
