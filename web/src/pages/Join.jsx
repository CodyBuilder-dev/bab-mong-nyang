import React, { useState, useRef } from "react";
import {
  makeStyles,
  TextField,
  FormControl,
  FormHelperText,
  Button,
  InputLabel,
  OutlinedInput
} from "@material-ui/core";
import {useStore,useFetchData} from "../components/custom-hooks/custom-hooks";
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
  },
  helperText: {
    color: "red"
  }
}));

const Join = props => {
  const classes = useStyles();
  const {input,updateField,onSubmit,onValidate,setInput} = useFetchData("","");
  const {store} = useStore();
  
  const onClickEvent =  async event =>{
    let result = await onSubmit(store.url+"/user");
    console.log(result)
    if(result == true){
      alert("환영합니다. " + input.u_Name + "님");
      props.history.replace("/login");
    }else{
      alert("회원가입에 실패했습니다.");
    }
  }
  const onBlurEvent = async event =>{
    if(event.target.value === undefined || event.target.value === ""){
      setInput({...input,idValidated : true});
    }else{
      const result = await onValidate(store.url+"/user/idCheck/"+event.target.value);
      setInput({...input,idValidated : result});
    }
  }
  return (
    <div className={classes.page}>
      <h2>회원가입</h2>

      <div className={classes.inputText}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="u_Id"
          label="아이디"
          id="u_Id"
          error={
            input.idValidated !== undefined && !input.idValidated
          }
          onChange={updateField}
          onBlur={onBlurEvent}
          value={input.u_Id}
          helperText={
            input.idValidated === undefined || input.idValidated
              ? ""
              : "이미 사용중인 아이디입니다"
          }
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
          onChange={updateField}
          value={input.u_Pw}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="pwcon"
          label="비밀번호 확인"
          type="password"
          id="pwcon"
          autoComplete="current-password"
          error={
            input.pwValidated !== undefined && !input.pwValidated
          }
          onChange={updateField}
          value={input.pwcon}
          helperText={
            input.pwValidated === undefined || input.pwValidated
              ? ""
              : "일치하지 않습니다"
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="u_Name"
          label="이름"
          name="u_Name"
          onChange={updateField}
          value={input.u_Name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="u_Email"
          label="이메일"
          name="u_Email"
          autoComplete="email"
          onChange={updateField}
          value={input.u_Email}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClickEvent}
        >
          회원 가입
        </Button>
      </div>
    </div>
  );
};

export default Join;
