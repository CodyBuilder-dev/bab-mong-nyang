import React from "react";
import {useFetchData} from "../components/custom-hooks/custom-hooks"
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
const DeviceModify = ({props, state,submit_Form}) =>{
  const classes = useStyles();
  const { input, isLoading ,setInput, updateField} = useFetchData(state.url+'/device/get/'+state.currentDeviceNo,'device');
  const onSubmit = async (e) => {
    console.log("axios요청 보냄");
    console.log(input);
    const result = await axios.put(state.url+"/device",input);
    console.log(result);
    if(result.data){
      submit_Form();
      props.history.push("/device");
    }else{
      alert("수정에 실패했습니다.");
    }
  };
  return (
    <>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className = {classes.page}>
          <h2>기기정보수정</h2>
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
              onChange={updateField}
              value={input.d_Name}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="d_Age"
              label="나이"
              name="d_Age"
              onChange={updateField}
              value={input.d_Age}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="d_Species"
              label="종 "
              id="d_Species"
              onChange={updateField}
              value={input.d_Species}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="d_Weight"
              label="몸무게"
              name="d_Weight"
              onChange={updateField}
              value={input.d_Weight}
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
  )
}

export default DeviceModify;