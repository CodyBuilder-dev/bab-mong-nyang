import React from "react";
import {
  makeStyles,
  TextField,
  Button
} from "@material-ui/core";
import {useStore, useFetchData} from "../components/custom-hooks/custom-hooks"
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

const Regist =props => {
  const classes = useStyles();
  const {input,updateField,onSubmit} = useFetchData("","");
  const {store} = useStore();
  
  const onClickEvent = async evnt =>{
    let result = await onSubmit(store.url + "/device");
    if(result){
      alert("기기등록에 성공했습니다.")
      props.history.replace("/device");
    }else{
      alert("기기등록에 실패했습니다.")
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
          id="d_Name"
          label="이름"
          name="d_Name"
          autoFocus
          onChange = {updateField}
          value = {input.d_Name}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="d_Age"
          label="나이"
          name="d_Age"
          value = {input.d_Age}
          onChange = {updateField}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="d_Species"
          label="종"
          name="d_Species"
          value = {input.d_Species}
          onChange = {updateField}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="d_Weight"
          label="몸무게"
          name="d_Weight"
          value={input.d_Weight}
          onChange = {updateField}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="SerialNo"
          label="일려번호 S/N"
          name="SerialNo"
          value = {input.SerialNo}
          onChange = {updateField}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClickEvent}
        >
          기기 등록
        </Button>
      </div>
    </div>
  );
};

export default Regist;
