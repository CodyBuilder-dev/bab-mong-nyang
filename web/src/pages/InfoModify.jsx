import React from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import axios from "axios";
import {
  useFetchData,
  useStore
} from "../components/custom-hooks/custom-hooks";
import { u_EmailCheck, u_NameCheck } from "../modules/regCheck";

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
const InfoModify = props => {
  const classes = useStyles();
  const { input, setInput, isLoading, updateField } = useFetchData(
    "/user/",
    "user"
  );
  const { store } = useStore();
  const onClickEvent = async event => {
    if (u_NameCheck(input.u_Name) && u_EmailCheck(input.u_Email)) {
      const result = await axios.put(store.url + "/user", input, {
        headers: store.headers
      });
      if (result.data) {
        alert("수정되었습니다.");
        props.history.replace("/info");
      } else {
        alert("수정에 실패했습니다.");
      }
    } else {
      alert("올바른 입력을 해주세요");
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
              id="u_Id"
              label="아이디"
              name="u_Id"
              value={input.u_Id}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="u_Name"
              label="이름"
              name="u_Name"
              value={input.u_Name}
              onChange = {updateField}
              error={
                !(input.u_Name === undefined || input.u_Name === "") &&
                !u_NameCheck(input.u_Name)
              }
              helperText={
                !(input.u_Name === undefined || input.u_Name === "") &&
                !u_NameCheck(input.u_Name)
                  ? "이름은 한글 2자리 이상 4자리 이하 또는 영문자 2자리 이상 15자리 이하의 길이여야 합니다"
                  : ""
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
              error={
                !(input.u_Email === undefined || input.u_Email === "") &&
                !u_EmailCheck(input.u_Email)
              }
              helperText={
                !(input.u_Email === undefined || input.u_Email === "") &&
                !u_EmailCheck(input.u_Email)
                  ? "올바른 이메일 형식에 맞게 입력해주세요"
                  : ""
              }
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

export default InfoModify;
