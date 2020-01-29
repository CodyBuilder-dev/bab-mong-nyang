import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modify from "../pages/Modify";
import axios from "axios";
import {
  changeInput,
  submitForm,
  validateForm,
} from "../modules/store";
const ModifyContainer = props => {
  const state = useSelector(state => state.store, []);
  const dispatch = useDispatch();
  const change_Input = useCallback(input => dispatch(changeInput(input)), [
    dispatch
  ]);
  const submit_Form = useCallback(() => dispatch(submitForm("")), []);
  const validate_Form = useCallback(flag => dispatch(validateForm(flag)), [
    dispatch
  ]);
  const onChange = useCallback(
    input => {
      if (
        input.pwcon === "" ||
        input.u_Pw === input.pwcon ||
        input.pwcon === undefined
      ) {
        input.validated = true;
      } else {
        input.validated = false;
      }
      change_Input(input);
      console.log(input);
    },
    [change_Input]
  );
  const onLoad = async curId => {
    await axios.get(state.url + "/user/" + state.currentID).then(res => {
      console.log(res.data[0]);
      change_Input({
        u_Id: res.data[0].u_Id,
        u_Pw: "",
        u_Email: res.data[0].u_Email,
        pwcon: "",
        u_Name: res.data[0].u_Name,
        validated: true
      });
    });
  };
  const onSubmit = useCallback(
    e => {
      if (state.pwcon === "") {
        validate_Form(false);
      } else {
        console.log("axios요청 보냄")
        axios
          .put(state.url + "/user", state.input)
          .then(res => {
            let flag = res.data;
            console.log(flag);
            if (flag) {
              alert("회원정보 수정");
              submit_Form();
              props.history.push("/info");
            }
          })
          .catch(error => {});
      }
    },
    [validate_Form, submit_Form, state]
  );
  return (
    <Modify
      state={state}
      onChange={onChange}
      onSubmit={onSubmit}
      onLoad={onLoad}
    ></Modify>
  );
};
export default ModifyContainer;
