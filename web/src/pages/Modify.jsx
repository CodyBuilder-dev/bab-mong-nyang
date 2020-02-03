import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/layout/LayoutMain";
import {
  makeStyles,
  TextField,
  Button
} from "@material-ui/core";
import axios from "axios";
import {useFetchData, useStore} from "../components/custom-hooks/custom-hooks";
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
const Modify = props => {
  const classes = useStyles();
  const {input, setInput,isLoading,updateField} = useFetchData('/user/','user');
  const {store} = useStore();
  const onClickEvent = async event => {
    const result = await axios.put(store.url+"/user",input);
    if(result.data){
      alert("수정되었습니다.");
      props.history.replace("/info");
    }else{
      alert("수정에 실패했습니다.");
    }
  }
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
              id="u_Name"
              label="이름"
              name="u_Name"
              focused
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
              id="u_Id"
              label="아이디"
              name="u_Id"
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
              수정하기
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modify;
