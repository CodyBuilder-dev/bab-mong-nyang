import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment
} from "@material-ui/core";
import { useFetchData, useStore } from "../custom-hooks/custom-hooks";
import { hour, minute } from "./Time";
import axios from "axios";
import { useEffect } from "react";

const AddSetting = props => {
  const { input, onSubmit, updateField, setInput } = useFetchData("", "");
  const [open, setOpen] = React.useState(false);
  const { store, onChangeStore } = useStore();
  useEffect(() => {
    setInput({ ...input, d_No: store.u_Last });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async event => {
    
    if (event.currentTarget.name === "close") {
      setOpen(false);
    } else {
      await onSubmit(store.url + "/setting")
        .then(res => {
          
          if (res.validation) {
            alert(res.message);
            setOpen(false);
            onChangeStore({ render: true });
            setInput({});
          } else {
            alert(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        추가
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">시간추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            배식 시간과 먹이량을 입력해주세요!
          </DialogContentText>
          <Box
            display="flex"
            alignItems="center"
            padding={2}
            width="100%"
            maxWidth="500px"
            justifyContent="flex-start"
          >
            <TextField
              id="hour-text"
              select
              variant="standard"
              name="hour"
              value={input.hour}
              onChange={updateField}
              SelectProps={{
                native: true
              }}
              inputProps={{
                style: {
                  padding: "6px 26px 7px 12px"
                }
              }}
              InputProps={{
                style: {
                  width: "58px"
                }
              }}
            >
              {hour.map(data => (
                <option value={data}>{data}</option>
              ))}
            </TextField>

            <Typography variant="body1">시</Typography>
            <TextField
              id="minute-text"
              select
              variant="standard"
              name="minute"
              value={input.minute}
              onChange={updateField}
              SelectProps={{
                native: true
              }}
              inputProps={{
                style: {
                  padding: "6px 26px 7px 12px"
                }
              }}
              InputProps={{
                style: {
                  width: "58px"
                  //textAlignLast : "center"
                }
              }}
            >
              {minute.map(data => (
                <option value={data}>{data}</option>
              ))}
            </TextField>
            <Typography variant="body1">분</Typography>

            <TextField
              variant="standard"
              name="s_Amount"
              value={input.s_Amount}
              onChange={updateField}
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                style: {
                  width: "65px",
                  textAlignLast: "center"
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button name="close" onClick={handleClose} color="primary">
            취소
          </Button>
          <Button name="add" onClick={handleClose} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddSetting;
