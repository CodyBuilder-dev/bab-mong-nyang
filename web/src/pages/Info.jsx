import React from "react";
import { makeStyles, TextField, Button, Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  useFetchData,
  useStore
} from "../components/custom-hooks/custom-hooks";
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
  page: {
    marginTop: theme.spacing(3),
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
    width: "43vw",
    maxWidth: "240px",
    lineHeight: "2.5rem",
    fontSize: 16
  }
}));
const Info = props => {
  console.log(props);
  const classes = useStyles();
  const { input, isLoading, dataFetch } = useFetchData("/user/", "user");
  const { store } = useStore();
  useEffect(() => {
    dataFetch(store.url + "/user/" + store.u_No, "user");
  }, [store]);
  //console.log(input);
  return (
    <div className={classes.page}>
      <h2>내 정보</h2>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className={classes.inputText}>
          <Typography>{input.u_Id}</Typography>
          <Typography>{input.u_Name}</Typography>
          <Typography>{input.u_Email}</Typography>
          {/* <TextField
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
          /> */}
          <Box display="flex" justifyContent="space-between">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => props.history.push("/infomodify")}
            >
              회원정보수정
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => props.history.push("/pwmodify")}
            >
              비밀번호수정
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};
export default Info;
