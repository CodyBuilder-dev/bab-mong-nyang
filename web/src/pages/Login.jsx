import React, { useEffect } from "react";
import {
  makeStyles,
  TextField,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {useInput,useStore} from "../components/custom-hooks/custom-hooks"
const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(1, 0, 1)
  },
  page: {
    marginTop: theme.spacing(8),
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

const Login = (props) => {
  const classes = useStyles();
  const{input,onChangeInput,onSubmit} = useInput();
  const {store, onChangeStore} = useStore();
  const onChangeEvent = event =>{
    const param = {};
    param[event.target.name] = event.target.value;
    console.log(param);
    onChangeInput(param);
  }
  const onClickEvent =  async event =>{
    let result = await onSubmit(store.url+"/user/login");
    console.log(result)
    if(result.u_No > 0){
      result ={
        ...result,
        currentUserNo : result.u_No
      }
      onChangeStore(result,"","");
      props.history.replace("/main");
    }
  }
  return (
    <div className={classes.page}>
      <h2>로그인</h2>

      <div className={classes.inputText}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="u_Id"
          label="아이디"
          name="u_Id"
          autoFocus
          value={input.u_Id}
          onChange={onChangeEvent}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="u_Pw"
          label="비밀번호 "
          type="password"
          id="u_Pw"
          autoComplete="current-password"
          value={input.u_Pw}
          onChange={onChangeEvent}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="아이디 저장"
          className={classes.label}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClickEvent}
        >
          로그인
        </Button>
        <Link to="/join" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            회원가입
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
