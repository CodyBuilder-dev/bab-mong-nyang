import React from "react";
import {
  useFetchData,
  useStore
} from "../components/custom-hooks/custom-hooks";
import {
  makeStyles,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Box
} from "@material-ui/core";

import CatIcon from "../caticon.png";
import DogIcon from "../dogicon.png";
import CatDisable from "../catDisable.png";
import DogDisable from "../dogDisable.png";
import clsx from "clsx";
import axios from "axios";
const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    lineHeight: "2.5rem",
    fontSize: 16
  },
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inputText: {
    width: "90vw",
    maxWidth: "500px",
    marginTop: theme.spacing(1)
  },
  halfInput: {
    width: "43vw",
    maxWidth: "240px"
  },
  icons: {
    width: "100px",
    height: "100px"
  },
  radioButtons: {
    display: "flex",
    justifyContent: "space-around"
  }
}));
const CatRadio = props => {
  const classes = useStyles();
  return (
    <Radio
      checkedIcon={
        <img src={CatIcon} alt="cat-check" className={classes.icons} />
      }
      icon={
        <img src={CatDisable} alt="cat-uncheck" className={classes.icons} />
      }
      {...props}
    />
  );
};
const DogRadio = props => {
  const classes = useStyles();
  return (
    <Radio
      checkedIcon={
        <img src={DogIcon} alt="dog-check" className={classes.icons} />
      }
      icon={
        <img src={DogDisable} alt="dog-uncheck" className={classes.icons} />
      }
      {...props}
    />
  );
};
const DeviceModify = props => {
  const classes = useStyles();
  const { store } = useStore();
  const { input, isLoading, updateField } = useFetchData(
    "/device/get/",
    "device"
  );
  const onSubmit = async e => {
    console.log("axios요청 보냄");
    console.log(input);
    const result = await axios.put(store.url + "/device", input, {
      headers: store.headers
    });
    console.log(result);
    if (result.data) {
      props.history.replace("/device");
    } else {
      alert("수정에 실패했습니다.");
    }
  };
  const onDelete = async e => {
    const result = await axios.delete(store.url + "/device/" + input.d_No, {
      headers: store.headers
    });
    if (result.data) {
      alert("삭제했습니다.");
      props.history.replace("/device");
    } else {
      alert("삭제에 실패했습니다.");
    }
  };
  return (
    <>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className={classes.page}>
          <div className={classes.inputText}>
            <FormControl component="fieldset" fullWidth className={classes.inputText}>
              <FormLabel component="legend" required>
                종을 선택해주세요
              </FormLabel>
              <RadioGroup
                aria-label="species"
                name="d_Species"
                value={input.d_Species}
                onChange={updateField}
                row
                className={classes.radioButtons}
              >
                <FormControlLabel
                  value="강아지"
                  control={<DogRadio />}
                  label="강아지"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="고양이"
                  control={<CatRadio />}
                  label="고양이"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
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
            <Box display="flex" justifyContent="space-between">
              <TextField
                variant="outlined"
                margin="normal"
                className={classes.halfInput}
                required
                id="d_Age"
                label="나이 (개월)"
                name="d_Age"
                value={input.d_Age}
                onChange={updateField}
              />
              <TextField
                variant="outlined"
                margin="normal"
                className={classes.halfInput}
                required
                id="d_Weight"
                label="몸무게 (kg)"
                name="d_Weight"
                value={input.d_Weight}
                onChange={updateField}
              />
            </Box>
            <TextField
              variant="outlined"
              margin="normal"
              required
              disabled
              fullWidth
              id="SerialNo"
              label="일련번호 S/N"
              name="SerialNo"
              value={input.SerialNo}
              onChange={updateField}
            />
            <Box display="flex" justifyContent="space-between">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={clsx(classes.submit, classes.halfInput)}
                onClick={onSubmit}
              >
                수정하기
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={clsx(classes.submit, classes.halfInput)}
                onClick={onDelete}
              >
                삭제하기
              </Button>
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default DeviceModify;
