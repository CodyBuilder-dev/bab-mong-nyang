import React from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import {useFetchData} from "../components/custom-hooks/custom-hooks";
const useStyles = makeStyles(theme => ({
  page: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inputText: {
    width: "300px", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    lineHeight: "2.5rem",
    fontSize: 16
  }
}));
const Info = props => {
  const classes = useStyles();
  const {input, isLoading} = useFetchData('/user/','user');
  //console.log(input);
  return (
    <div className={classes.page}>
      <h2>내 정보</h2>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className={classes.inputText}>
          <TextField
            id="outlined-read-only-input"
            label="아이디"
            value={input.u_Id}
            InputProps={{
              readOnly: true
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input"
            label="이름"
            defaultValue={input.u_Name}
            InputProps={{
              readOnly: true
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input"
            label="이메일"
            defaultValue={input.u_Email}
            InputProps={{
              readOnly: true
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <Link to="/infomodify" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              회원정보수정
            </Button>
          </Link>
          <Link to="/pwmodify" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              비밀번호수정
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Info;
