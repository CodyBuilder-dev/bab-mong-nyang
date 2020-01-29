import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeviceModify from "../pages/DeviceModify";
import axios from "axios";
import { submitForm } from "../modules/store";
const DeviceModifyContainer = props => {
  const state = useSelector(state => state.store, []);
  const dispatch = useDispatch();
  const submit_Form = useCallback(() => dispatch(submitForm("")), []);
  const onSubmit = (input) => {
    console.log("axios요청 보냄")
    input = {...input,d_No : state.currentDeviceNo};
    console.log(input);
    axios
      .put(state.url + "/device", input)
      .then(res => {
        let flag = res.data;
        console.log(flag);
        if (flag) {
          alert("기기정보 수정");
          submit_Form();
          props.history.push("/device");
        }
      })
      .catch(error => {
        alert(error);
      });
  }
  return (
    <DeviceModify
      submit_Form={submit_Form}
      state = {state}
      props = {props}
    ></DeviceModify>
  );
};
export default DeviceModifyContainer;
