import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/layout/LayoutMain";
import {
  makeStyles,
  TextField,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";

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
const Modify = ({ props, state, onChange, onSubmit, onLoad }) => {
  const classes = useStyles();
  const [input, setInput] = useState({});
  //const [url, setUrl] = useState(state.url+'/user/' + state.currentID);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("mount");
    const fetch = async () => {
      setIsLoading(true);
      const result = await axios.get(state.url + "/user/" + state.currentID);
      console.log(result);
      result.data[0].u_Pw = "";
      setInput(result.data[0]);
      setIsLoading(false);
    };
    fetch();
    //console.log(input);
  }, []);

  const onChangeInput = e => {
    //console.log(input);
    let key = e.target.name;
    switch (key) {
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
    <>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className={classes.page}>
          <h2>회원수정</h2>

          <div className={classes.inputText}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="이름"
              name="name"
              focused
              onChange={onChangeInput}
              value={input.u_Name}
              InputProps={{
                readOnly: true
              }}
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
              value={input.u_Id}
              InputProps={{
                readOnly: true
              }}
              focused
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
              value={state.input.u_Pw}
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
              error={
                state.input.validated !== undefined && !state.input.validated
              }
              onChange={onChangeInput}
              value={state.input.pwcon}
              helperText={
                state.input.validated === undefined || state.input.validated
                  ? ""
                  : "일치하지 않습니다"
              }
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
              value={input.u_Email}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              수정하기
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modify;
