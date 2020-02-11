import React, { useEffect, useState } from "react";
import {
  makeStyles,
  TextField,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import clsx from "clsx";
import {
  useStore,
  useFetchData
} from "../components/custom-hooks/custom-hooks";
import CatIcon from "../caticon.png";
import DogIcon from "../dogicon.png";
import CatDisable from "../catDisable.png";
import DogDisable from "../dogDisable.png";

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
  },
  icons: {
    width: "100px",
    height: "100px"
  }
}));
const CatRadio = props => {
  const classes = useStyles();
  return (
    <Radio
      checkedIcon={<img src={CatIcon} alt="cat-check" className={classes.icons} />}
      icon={<img src={CatDisable} alt="cat-uncheck" className={classes.icons} />}
      {...props}
    />
  );
};
const DogRadio = props => {
  const classes = useStyles();
  return (
    <Radio
      checkedIcon={<img src={DogIcon} alt="dog-check" className={classes.icons} />}
      icon={<img src={DogDisable} alt="dog-uncheck" className={classes.icons} />}
      {...props}
    />
  );
};
const Regist = props => {
  const classes = useStyles();
  const { input, updateField, onSubmit, setInput, onValidate } = useFetchData(
    "",
    ""
  );
  const { store, onChangeStore } = useStore();
  const [species, setSpecies] = useState()
  const handleChange = e => {
    setSpecies(e.target.value)
  }
  let checked = false;
  useEffect(() => {
    setInput({ u_No: store.u_No });
  }, []);
  const onClickEvent = async event => {
    if (checked) {
      let result = await onSubmit(store.url + "/device");
      if (result !== false) {
        onChangeStore({ ...store, u_Last: result });
        alert("기기등록에 성공했습니다.");
        props.history.goBack();
      } else {
        alert("기기등록에 실패했습니다.");
      }
    } else {
      alert("일련번호 확인이 필요합니다.");
    }
  };
  const onCheckEvent = async event => {
    if (input.SerialNo === undefined || input.SerialNo === "") {
      alert("일련번호를 입력해주세요!!");
    } else {
      const result = await onValidate(
        store.url + "/device/check/" + input.SerialNo
      );
      if (result) {
        alert("올바른 일련번호입니다.");
        checked = true;
      } else {
        alert("등록되지 않은 일련번호입니다.");
      }
    }
  };
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
          value={input.d_Age}
          onChange={updateField}
        />
        {/* <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="d_Species"
          label="종"
          name="d_Species"
          value={input.d_Species}
          onChange={updateField}
        /> */}
        <FormControl component="fieldset">
          <FormLabel component="legend" required>종</FormLabel>
          <RadioGroup
            aria-label="species"
            name="d_Species"
            value={input.d_Species}
            onChange={updateField}
            row
          >
            <FormControlLabel
              value="강아지"
              control={<DogRadio />}
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="고양이"
              control={<CatRadio />}
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="d_Weight"
          label="몸무게"
          name="d_Weight"
          value={input.d_Weight}
          onChange={updateField}
        />

        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          fullWidth
          margin="normal"
        >
          <InputLabel htmlFor="outlined-adornment-password" required>
            일련번호 S/N
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={input.SerialNo}
            onChange={updateField} //나중에 혹시 시간이 되면 바꿀 것
            name="SerialNo"
            required={true}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={onCheckEvent}>확인</Button>
              </InputAdornment>
            }
            labelWidth={104}
          />
        </FormControl>
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
