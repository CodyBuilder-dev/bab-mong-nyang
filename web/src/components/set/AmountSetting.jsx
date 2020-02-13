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
  InputAdornment,
  Tab,
  AppBar,
  Tabs
} from "@material-ui/core";
import { useFetchData, useStore } from "../custom-hooks/custom-hooks";
import { useEffect } from "react";
import { s_AmountCheck } from "../../modules/regCheck";
import Calculator from "../../assets/icons/calculator.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const AmountSetting = props => {
  const { input, onSubmit, updateField, setInput } = useFetchData("", "");
  const [open, setOpen] = useState(false);
  const { store, onChangeStore } = useStore();
  //const [select, setSelect] = useState(2);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  // const tabChange = event => {
  //   setValue(event.target.value);
  // };
  const handleClose = async event => {
    if (event.currentTarget.name !== "add") {
      //setInput({});
    } else {
      // if (s_AmountCheck(input.s_Amount)) {
      //   await onSubmit(store.url + "/setting")
      //     .then(res => {
      //       if (res.validation) {
      //         alert(res.message);
      //         setInput({});
      //         setOpen(false);
      //         onChangeStore({ render: true });
      //       } else {
      //         alert(res.message);
      //       }
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
      // } else {
      //   //alert("1~999사이의 값을 입력해주세요");
      // }
    }
    setOpen(false);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <img
        src={Calculator}
        alt="calculator"
        style={{ width: "50px", height: "50px" }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen}
      >
        <DialogTitle id="form-dialog-title">칼로리 계산기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              display="inline"
              alignItems="center"
              justifyContent="center"
              padding={2}
              width="100%"
              maxWidth="500px"
            >
              <Box alignItems="center" justifyContent="center">
                <Typography>우선 기기등록을 해야 합니다</Typography>
              </Box>
              <Box>
                <Typography>검색으로 배급할 사료를 찾거나</Typography>
              </Box>
              <Box>
                <Typography>사료의 포장지에 있는 값을 입력해주세요</Typography>
              </Box>
            </Box>
          </DialogContentText>
          <AppBar position="static"  style ={{width : "63%",}}>
            <Tabs
              value={value}
              
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="검색" {...a11yProps(0)} />
              <Tab label="입력" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <Box
            display="flex"
            alignItems="center"
            padding={2}
            width="100%"
            maxWidth="500px"
            justifyContent="flex-start"
          ></Box>
        </DialogContent>
        <DialogActions>
          <Button name="close" onClick={handleClose} color="primary">
            취소
          </Button>
          <Button name="add" onClick={handleClose} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AmountSetting;
