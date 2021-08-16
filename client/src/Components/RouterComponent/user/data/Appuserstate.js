import Appcontext from "./Appcontext";
import { isAuth, signOut } from "../../../../authent/helpers";
import React  from "react";
import {useState} from "react"
import { useEffect } from "react";
const axios = require('axios');





const Appuserstate =(props)=> {

const [details,setDetails]= useState({name:"Anonymous",email:"Anonymous"})
   
//     const [name,setName]= useState("")
//     const [ress,setRess] = useState("welcome");


//     let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZmZWIzN2EzNGQxMzMzZmMzMzFhY2UiLCJpYXQiOjE2Mjc0NzA2ODUsImV4cCI6MTYyODA3NTQ4NX0.ks53e7195-qFUI5J3kX0_1yNFDXkS7HF55NOhh-QnHM"

//     let api='http://localhost:5000/api/users/60ffeb37a34d1333fc331ace'


//         let result = axios.get(api , { headers: {"Authorization" : `Bearer ${token}`} })
        
//         .then(data =>data.data);
        
// console.log(result)
// result.then(data=>setName(()=>data.name)) 

//isAuth()? setDetails(()=>isAuth()) : setDetails("")

   

console.log(details)
    

    return (
        <Appcontext.Provider value={{details,setDetails}}>
            {props.children}

        </Appcontext.Provider>
    )
}


export default Appuserstate; 