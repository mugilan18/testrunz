import React, { useEffect, useState } from "react";

import axios from "axios";

import Button from "@material-ui/core/Button";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import ApiUrl from "../../../ServerApi";


import { DataGrid } from "@material-ui/data-grid";

import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import dataP1 from "./procedureData"


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "65vw",
    height: "70vh",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Runz = (props) => {
  const [dat, setDat] = useState(null);
  const classes = useStyles();

  useEffect(()=>{

    dataP1.then(data=>setDat(()=>data))

  }, [])

  
  
  const addProc = () => {
    window.localStorage.clear();
    props.history.push("/addProce");
  };

  

  const editProc = (id) => {
    window.localStorage.clear();
    axios.get(`${ApiUrl}/moreInfo/${id}`).then((res) => { 
      window.localStorage.setItem("proceId", res.data.id);
    })
    
    props.history.push(`/editProce/${id}`);
  };


  return (
    <div className={classes.root}>
      <Button
        style={{
          border: "none",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
        onClick={() => addProc()}
      >
        <AddCircleOutlineIcon style={{ fontSize: "3.5em" }} />
      </Button>
      

      {dat && dat.data.data ? (
        <DataGrid
          pagination
          columns={[
            {
              field: "id",
              headerName: "id",
              description: "The identification used Procedure Sequence.",
              width: 170,
            },
            {
              field: "ProcedureName",
              headerName: "Procedure Name",
              width: 170,
            },
            { field: "labtype", headerName: "Lab Type", width: 170 },

            {
              field: "department",
              headerName: "department",
              width: 170,
            },
            { field: "year", headerName: "year", width: 170 },
            { field: "college", headerName: "college", width: 170 },
            {
              field: "editProcedure",
              headerName: "Edit Procedure",
              disableClickEventBubbling: true,
              renderCell: (params) => {
                const onClick = () => {
                  const api = params.api;

                  const fields = api
                    .getAllColumns()
                    .map((c) => c.field)
                    .filter((c) => c !== "__check__" && !!c);

                  const thisRow = {};
                  fields.forEach((f) => {
                    thisRow[f] = params.row?.[f];
                  });

                  return editProc(thisRow["id"]);
                };
                return <Button onClick={onClick}>Edit</Button>;
              },
            },
          ]}
          rows={dat.data.data}
        />
      ) : null}
    </div>
  );
};

export default Runz;