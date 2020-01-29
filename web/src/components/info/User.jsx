import React, { useEffect, useState } from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import {useFetchData} from "../custom-hooks/custom-hooks";
const useStyles = makeStyles(theme => ({
  page: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inputText: {
    width: "300px", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    lineHeight: "2.5rem",
    fontSize: 16
  }
}));
const User = props => {
  const classes = useStyles();
  const store = useSelector(state => state.store, []);
  const {input, isLoading} = useFetchData(store.url+'/user/'+store.currentID,'user');
  //console.log(input);
  return (
    <div className={classes.page}>
      <h2>내 정보</h2>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className={classes.inputText}>
          <TextField
            id="outlined-read-only-input"
            label="아이디"
            value={input.u_Id}
            InputProps={{
              readOnly: true
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input"
            label="이름"
            defaultValue={input.u_Name}
            InputProps={{
              readOnly: true
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input"
            label="이메일"
            defaultValue={input.u_Email}
            InputProps={{
              readOnly: true
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <Link to="/modify" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              수정하기
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default User;
