import React, { useState } from "react";
import {
  makeStyles,
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
  ButtonGroup
} from "@material-ui/core";
import { useFetchData, useStore } from "../custom-hooks/custom-hooks";
import axios from "axios";
import { useEffect } from "react";
import AddSetting from "./AddSetting";
import { hour, minute } from "./Time";
import { s_AmountCheck } from "../../modules/regCheck";
import AmountSetting from "./AmountSetting";

const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    fontSize: "14px",
    width: "20px"
  }
}));

const TimeTable = props => {
  const classes = useStyles();
  const { store, onChangeStore } = useStore();
  const [editable, setEditable] = useState({});
  const [click, setClick] = useState([false, -1]);

  const modifyClickEvent = async event => {
    console.log(click);
    console.log(event.currentTarget.value);
    if (click[0] && click[1] !== event.currentTarget.value) {
      alert("수정을 완료한 후 시도해주세요");
    } else {
      setClick([true, event.currentTarget.value]);
      const index = event.currentTarget.value;
      if (editable === {} || !editable[index]) {
        setEditable({ ...editable, [index]: true });
      } else {
        if (s_AmountCheck(input.data[index].s_Amount)) {
          await axios({
            method: "PUT",
            url: store.url + "/setting",
            headers: store.headers,
            data: input.data[index]
          })
            .then(res => {
              if (res.data.validation) {
                //alert(res.data.message);
                setEditable({ ...editable, [index]: false });
                dataFetch(store.url + "/setting/" + store.u_Last, "timetable");
                setClick([false, -1]);
              } else {
                // alert(res.data.message);
              }
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          alert("1~999사이의 값을 입력해주세요");
        }
      }
    }
  };

  const delteClickEvent = async event => {
    if (event.currentTarget.name === "삭제") {
      const targetIndex = event.currentTarget.value;
      await axios({
        method: "DELETE",
        url: store.url + "/setting/" + input.data[targetIndex].s_No,
        headers: store.headers
      })
        .then(res => {
          if (res.data.validation) {
            // alert(res.data.message);
            dataFetch(store.url + "/setting/" + store.u_Last, "timetable");
          } else {
            // alert(res.data.message);
          }
        })
        .catch(error => {
          alert("통신에러가 발생!");
        });
    } else {
      setEditable({ ...editable, [event.currentTarget.value]: false });
      dataFetch(store.url + "/setting/" + store.u_Last, "timetable");
    }
  };

  const { input, isLoading, setInput, dataFetch } = useFetchData(
    "/setting/",
    "timetable"
  );

  // useEffect(() => {
  //   if (store.render) {
  //     dataFetch(store.url + "/setting/" + store.u_Last, "timetable");
  //     onChangeStore({ render: false });
  //   }
  // }, [store]);
  React.useMemo(() => {
    if (store.render) {
      dataFetch(store.url + "/setting/" + store.u_Last, "timetable");
      onChangeStore({ render: false });
    }
  }, [store]);
  // useEffect(() => {
  //   dataFetch(store.url + "/setting/" + store.u_Last, "timetable");
  // }, [store.headers]);

  return (
    <div className={classes.page}>
      <Box width="100%" maxWidth="500px">
        <Box
          width="100%"
          maxWidth="500px"
          display="flex"
          justifyContent="space-between"
        >
          <AmountSetting></AmountSetting>

          <AddSetting></AddSetting>
        </Box>
        {/* 반복내용 시작 */}
        {isLoading ? (
          <></>
        ) : input.data === undefined ? (
          <></>
        ) : (
          input.data.map((inputData, index) => (
            <Box
              display="flex"
              alignItems="center"
              border={2}
              borderRadius={16}
              padding={2}
              borderColor={editable[index] ? "warning.main" : "primary.main"}
              width="100%"
              marginTop={2}
              justifyContent="space-between"
              key={index}
            >
              <TextField
                id="outlined-select-currency-native"
                select={editable === {} ? false : editable[index]}
                value={inputData.s_Time.slice(0, 2)}
                onChange={event => {
                  const value = event.target.value;
                  let tmp = input.data;
                  tmp[index].s_Time =
                    value + ":" + tmp[index].s_Time.slice(3, 5);
                  setInput({ data: tmp });
                }}
                variant="standard"
                SelectProps={{
                  native: true
                }}
                inputProps={{
                  style: {
                    padding: "6px 26px 7px 12px"
                  }
                }}
                InputProps={{
                  readOnly: editable === {} ? false : editable[index],
                  style: {
                    width: "58px",
                    textAlignLast: "center"
                  }
                }}
              >
                {hour.map((data, key) => (
                  <option value={data} key={key}>
                    {data}
                  </option>
                ))}
              </TextField>
              <Typography variant="body1">시</Typography>
              <TextField
                id="minute-text"
                select={editable === {} ? false : editable[index]}
                variant="standard"
                SelectProps={{
                  native: true
                }}
                value={inputData.s_Time.slice(3, 5)}
                onChange={event => {
                  const value = event.target.value;
                  let tmp = input.data;
                  tmp[index].s_Time =
                    tmp[index].s_Time.slice(0, 2) + ":" + value;
                  setInput({ data: tmp });
                }}
                inputProps={{
                  style: {
                    padding: "6px 26px 7px 12px"
                  }
                }}
                InputProps={{
                  readOnly: editable === {} ? false : editable[index],
                  style: {
                    width: "58px"
                    //textAlignLast : "center"
                  }
                }}
              >
                {minute.map((data, key) => (
                  <option value={data} key={key}>
                    {data}
                  </option>
                ))}
              </TextField>
              <Typography variant="body1">분</Typography>

              <TextField
                variant="standard"
                value={
                  isNaN(inputData.s_Amount) ? 0 : Number(inputData.s_Amount)
                }
                name="s_Amount"
                onChange={event => {
                  let value = event.target.value;
                  let tmp = input.data;
                  if (isNaN(value)) {
                    value = 0;
                  }
                  if (Number(value) > 999) {
                    value = 999;
                  }
                  tmp[index].s_Amount = value;
                  setInput({ data: tmp });
                }}
                InputProps={{
                  readOnly: editable === {} ? false : !editable[index],
                  endAdornment: (
                    <InputAdornment position="end">g</InputAdornment>
                  ),
                  style: {
                    width: "75px",
                    textAlignLast: "right"
                  }
                }}
              />
              <ButtonGroup
                orientation="vertical"
                style={{
                  marginLeft: "20px"
                }}
                aria-label="vertical outlined primary button group"
              >
                <Button
                  value={index}
                  onClick={modifyClickEvent}
                  className={classes.button}
                  size="small"
                  color="primary"
                  style={{
                    padding: "1px 1px 1px 1px"
                  }}
                  key={index}
                >
                  수정
                </Button>
                <Button
                  value={index}
                  name={
                    editable[index] !== undefined && editable[index]
                      ? "취소"
                      : "삭제"
                  }
                  onClick={delteClickEvent}
                  className={classes.button}
                  size="small"
                  color="secondary"
                  style={{
                    padding: "1px 1px 1px 1px"
                  }}
                >
                  {editable[index] !== undefined && editable[index]
                    ? "취소"
                    : "삭제"}
                </Button>
              </ButtonGroup>
            </Box>
          ))
        )}
      </Box>
    </div>
  );
};

export default TimeTable;
