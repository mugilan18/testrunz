import React, { useEffect, useState,useContext,useCallback } from "react";
import { isAuth, signOut } from "../../../authent/helpers";

import axios from "axios";

import Button from "@material-ui/core/Button";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Typography from "@material-ui/core/Typography";
import { DataGrid } from "@material-ui/data-grid";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import ApiService from "../../../Sevices/ApiService";

import Appcontext from "./data/Appcontext"

import ApiUrl from "../../../ServerApi";

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

const style = {
  marginTop: "25px",
  display: "flex",
  justifyContent: "center",
  textDecoration: "underline",
};

const Runz = (props) => {
  let rows = [];
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  

  // const {setDetails,details} = useContext(Appcontext);
 

  useEffect(async () => {
  const usersdum = await ApiService.fetchUsers().then((res) => res);
  setUsers(()=>usersdum.data.data)
  
  }, []);


  //
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addUser = () => {
    window.localStorage.clear();
    props.history.push("/add-user");
  };

  const deleteUser = async (userId) => {
    await ApiService.deleteUser(userId).then(() => {
      setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      setMessage("User deleted successfully.");
    });
    const deleteUser = users.find((user) => user._id === userId);
    await axios.delete(`${ApiUrl}/notes/${deleteUser.runID}`);
    setOpen(true);
  };

  const editUser = (id) => {
    window.localStorage.clear();
    window.localStorage.setItem("userId", id);
    props.history.push("/edit-user");
  };

  const playUser = (id) => {
    window.localStorage.clear();
    window.localStorage.setItem("userId", id);
    props.history.push(`/userdash/${id}`);
  };

  users.map((user, ident) =>
    rows.push({
      id: ident,
      ProcedureId: user._id,
      TemplateId: user.runID.slice(user.runID.length - 12),
      ProcedureName: user.experimentName,
      LabName: user.labType,
      ExperimentName: user.experimentName,
      editUser: () => editUser(user._id),
      deleteUser: () => deleteUser(user._id),
      playUser: () => playUser(user._id),
    })
  );

  return (
    <div className={classes.root}>
      
      <Button
        style={{
          border: "none",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
        onClick={() => addUser()}
      >
        <AddCircleOutlineIcon style={{ fontSize: "3.5em" }} />
      </Button>
      {rows ? (
        <DataGrid
          pagination
          columns={[
            {
              field: "ProcedureId",
              headerName: "Procedure Id",
              description: "The identification used Procedure Sequence.",
              width: 170,
            },
            {
              field: "ProcedureName",
              headerName: "Procedure Name",
              width: 170,
            },
            { field: "TemplateId", headerName: "Template Id", width: 170 },

            {
              field: "ExperimentName",
              headerName: "Experiment Name",
              width: 170,
            },
            { field: "LabName", headerName: "Lab Name", width: 170 },

            {
              field: "editUser",
              headerName: "Edit User",
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

                  return editUser(thisRow["ProcedureId"]);
                };
                return <Button onClick={onClick}>Edit</Button>;
              },
            },
            {
              field: "deleteUser",
              headerName: "Delete User",
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

                  return deleteUser(thisRow["ProcedureId"]);
                };
                return <Button onClick={onClick}>Delete</Button>;
              },
            },
            {
              field: "playUser",
              headerName: "Play User",
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

                  return playUser(thisRow["ProcedureId"]);
                };
                return <Button onClick={onClick}>Play</Button>;
              },
            },
          ]}
          rows={rows}
        />
      ) : null}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Runz;
