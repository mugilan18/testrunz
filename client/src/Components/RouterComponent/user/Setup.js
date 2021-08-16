import React, { useEffect, useState } from "react";

import axios from "axios";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

import serverApi from "../../../ServerApi";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const style = {
  marginTop: "25px",
  display: "flex",
  justifyContent: "center",
  textDecoration: "underline",
};

/* const formContainer = {
  display: "flex",
  flexFlow: "column wrap",
  alignContent: "space-between",
};

const intialValue = {
  id:"",
  labType: "",
  experimentName: "",
  department: "",
  year: "",
  college: "",
}; */

const Runz = (props) => {
   const classes = useStyles();
  /*const [data, setData] = useState(intialValue);

  

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const saveUser = (e) => {
    e.preventDefault();
    axios.post(serverApi+ "/labrotories", {name: data.labType, experiment: data.experimentName})
  };
 */
  return (
    <div className={classes.root}>
      <Typography variant="h6" style={style}>
        TestRunz Setup
      </Typography>
      {/* <>
      <form style={formContainer}>
      <input type="text" name="id" placeholder="id" value={data.id} onChange={onChange} />
      <input type="text" name="experimentName" placeholder="Experiment Name" value={data.experimentName} onChange={onChange} />
      <input type="text" name="labType" placeholder="Lab Type" value={data.labType} onChange={onChange} />
      <input type="text" name="department" placeholder="Department" value={data.department} onChange={onChange} />
      <input type="text" name="year" placeholder="Year" value={data.year} onChange={onChange} />
      <input type="text" name="college" placeholder="college" value={data.college} onChange={onChange} />
      <Button variant="contained" color="primary" onClick={saveUser}>
          Save
      </Button>
      </form>
    </> */}
    </div>
  );
};

export default Runz;
