import React from "react";
import {
  makeStyles,
  TextField,
  Button
} from "@material-ui/core";

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

const Regist =({props,onChange,onSubmit,state}) => {
  const classes = useStyles();
  let input = state.input;
  const onChangeInput = e => {
    let key = e.target.name;
    if(input.u_No === undefined) input.u_No = state.currentUserNo;
    switch (key) {
      case "name":
        input.d_Name = e.target.value;
        onChange(input);
        break;
      case "age":
        input.d_Age = e.target.value;
        onChange(input);
        break;
      case "species":
        input.d_Species = e.target.value;
        onChange(input);
        break;
      case "weight":
        input.d_Weight = e.target.value;
        onChange(input);
        break;
      case "serialno":
        input.SerialNo = e.target.value;
        onChange(input);
        break;
      default:
        console.log("default");
    }
  }
  return (
    <div className={classes.page}>
      <h3>반려동물의 정보를 입력해주세요</h3>
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
          onChange = {onChangeInput}
          value = {state.input.d_Name}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="age"
          label="나이"
          name="age"
          value = {state.input.d_Age}
          onChange = {onChangeInput}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="species"
          label="종"
          name="species"
          value = {state.input.d_Species}
          onChange = {onChangeInput}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="weight"
          label="몸무게"
          name="weight"
          value={state.input.d_Weight}
          onChange = {onChangeInput}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="serialno"
          label="일려번호 S/N"
          name="serialno"
          value = {state.input.serialno}
          onChange = {onChangeInput}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSubmit}
        >
          기기 등록
        </Button>
      </div>
    </div>
  );
};

export default Regist;
