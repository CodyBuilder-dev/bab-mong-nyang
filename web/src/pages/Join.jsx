import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    lineHeight: "2.5rem",
    fontSize: 16
  },
  page: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inputText: {
    width: "300px", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

const Join = ({ props, state, onChange, onSubmit }) => {
  const classes = useStyles();
  let input = {
    u_Id: state.u_Id,
    u_Pw: state.u_Pw,
    pwcon: state.pwcon,
    validated: true,
    u_Email: state.u_Email,
    u_Name: state.u_Name
  };
  const onChangeInput = e => {
    console.log(e);
    let key = e.target.name;
    switch (key) {
      case "name":
        input.u_Name = e.target.value;
        onChange(input);
        break;
      case "id":
        input.u_Id = e.target.value;
        onChange(input);
        break;
      case "pw":
        input.u_Pw = e.target.value;
        onChange(input);
        break;
      case "email":
        input.u_Email = e.target.value;
        onChange(input);
        break;
      case "pwconfirm":
        input.pwcon = e.target.value;
        onChange(input);
        break;
      default:
        console.log("default");
    }
  };

  return (
    <div className={classes.page}>
      <h2>회원가입</h2>

      <div className={classes.inputText}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="이름"
          name="name"
          autoFocus
          onChange={onChangeInput}
          value={state.u_Name}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="id"
          label="아이디"
          name="id"
          onChange={onChangeInput}
          value={state.u_Id}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="pw"
          label="비밀번호 "
          type="password"
          id="pw"
          autoComplete="current-password"
          onChange={onChangeInput}
          value={state.u_Pw}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="pwconfirm"
          label="비밀번호 확인"
          type="password"
          id="pwconfirm"
          autoComplete="current-password"
          error={state.validated}
          onChange={onChangeInput}
          value={state.pwcon}
          helperText={state.validated ? "일치하지 않습니다" : ""}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="이메일"
          name="email"
          autoComplete="email"
          onChange={onChangeInput}
          value={state.u_Email}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSubmit}
        >
          회원 가입
        </Button>
      </div>
    </div>
  );
};

export default Join;
