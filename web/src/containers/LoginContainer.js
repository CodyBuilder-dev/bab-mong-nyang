import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../pages/Login";
import {
  changeInput,
  submitForm,
  setCurrentUserNo,
  changeStore
} from "../modules/store";
import axios from "axios";
const LoginContainer = props => {
  const state = useSelector(state => state.store, []);
  const dispatch = useDispatch();
  const change_Input = useCallback(input => dispatch(changeInput(input)), [
    dispatch
  ]);
  const change_Store = useCallback(data => dispatch(changeStore(data)),[dispatch]);
  const submit_Form = useCallback(() => dispatch(submitForm("")), [dispatch]);
  const setCurrentUser_No = useCallback(id => dispatch(setCurrentUserNo(id)), [
    dispatch
  ]);
  const onChange = useCallback(
    input => {
      change_Input(input);                                                                                         
    },
    [change_Input]
  );
  const onSubmit = useCallback(
     e => {
      axios.post(state.url + "/user/login", state.input).then(res => {
        console.log(res.data);
        if (res.data !== undefined && res.data !== false) {
          setCurrentUser_No(''+res.data.u_No);
          change_Store({u_Last : res.data.u_Last});
          props.history.push("/main");
        } else {
          alert("잘못된 입력입니다.");
        }
      });
    },
    [state, setCurrentUser_No, submit_Form]
  );
  return <Login onSubmit={onSubmit} onChange={onChange} state={state} />;
};

export default LoginContainer;
