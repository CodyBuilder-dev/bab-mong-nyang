import React from "react";
import {
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import {
  useStore,
  useFetchData
} from "../components/custom-hooks/custom-hooks";
import { useEffect } from "react";
import {
  u_IdCheck,
  u_EmailCheck,
  u_NameCheck,
  u_PwCheck
} from "../modules/regCheck";

const useStyles = makeStyles(theme => ({
  page: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inputText: {
    width: "90vw",
    maxWidth: "500px",
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(2),
    width: "90vw",
    maxWidth: "500px",
    lineHeight: "2.5rem",
    fontSize: 16
  },
  helperText: {
    color: "red"
  }
}));

const Join = props => {
  const classes = useStyles();
  const { input, updateField, onSubmit, onValidate, setInput } = useFetchData(
    "",
    ""
  );
  const { store } = useStore();

  const onClickEvent = async event => {
    if (
      u_PwCheck(input.u_Pw) &&
      input.pwValidated
    ) {
      let result = await onSubmit(store.url + "/user");

      if (result == true) {
        alert("환영합니다. " + input.u_Name + "님");
        props.history.replace("/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } else {
      alert("올바른 입력을 해주세요");
    }
  };
  const onBlurEvent = async event => {
    if (event.target.value === undefined || event.target.value === "") {
      setInput({ ...input, idValidated: true });
    } else {
      const result = await onValidate(
        store.url + "/user/idCheck/" + event.target.value
      );
      setInput({ ...input, idValidated: result });
    }
  };
  useEffect(() => {}, [updateField]);

  return (
    <div className={classes.page}>
      <h2>비밀번호 수정</h2>

      <div className={classes.inputText}>
        
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
          error={
            !(input.u_Pw === undefined || input.u_Pw === "") &&
            !u_PwCheck(input.u_Pw)
          }
          helperText={
            !(input.u_Pw === undefined || input.u_Pw === "") &&
            !u_PwCheck(input.u_Pw)
              ? "패스워드는 첫째자리는 영문자로 시작하고 영문자, 숫자, 특수문자를 포함해야 하며, 3자리 이상 15자리 이하의 길이여야 합니다"
              : ""
          }
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
          error={input.pwValidated !== undefined && !input.pwValidated}
          onChange={updateField}
          value={input.pwcon}
          helperText={
            input.pwValidated === undefined || input.pwValidated
              ? ""
              : "일치하지 않습니다"
          }
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClickEvent}
        >
          변경하기
        </Button>
      </div>
    </div>
  );
};

export default Join;
