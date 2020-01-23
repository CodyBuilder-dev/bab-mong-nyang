import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../pages/Login";
//import { submitLogin, changeInput ,submitLogout} from '../modules/login';
import {
  changeInput,
  submitForm,
  validateForm,
  setCurrentID
} from "../modules/store";
import axios from "axios";
const LoginContainer = props => {
  const state = useSelector(state => state.store, []);
  const dispatch = useDispatch();
  const change_Input = useCallback(input => dispatch(changeInput(input)), [
    dispatch
  ]);
  const submit_Form = useCallback(() => dispatch(submitForm("")), [dispatch]);
  const setCurrent_ID = useCallback(id => dispatch(setCurrentID(id)), [
    dispatch
  ]);
  const onChange = useCallback(
    input => {
      change_Input(input);
      console.log(input);
    },
    [change_Input]
  );
  const onSubmit = useCallback(
    e => {
      axios.post(state.url + "/user/login", state.input).then(res => {
        let flag = res.data;
        console.log(flag);
        if (flag) {
          setCurrent_ID(state.input.u_Id);
          props.history.push("/main");
          //submit_Form();
        } else {
          alert("잘못된 입력입니다.");
        }
      });
    },
    [state, setCurrent_ID, submit_Form]
  );
  // const url = 'http://70.12.246.68:3000';
  // const changeId = useCallback(id => dispatch(submitLogin(id)),[dispatch]);
  // const onChangeInput = useCallback(input => dispatch(changeInput(input)),[dispatch]);
  // const onlogout = useCallback(()=>dispatch(submitLogout()),[dispatch]);
  // const onSubmit = useCallback(
  //     e=>{
  //         axios.post(url+'/user/login',{
  //             u_Id: state.inputId,
  //             u_Pw: state.inputPw
  //         }).then(res =>{
  //             console.log(res);
  //             let validate = res.data;
  //             if(validate){
  //                 changeId(state.inputId);
  //                 props.history.push('/main');
  //             }else{
  //                 alert('잘못된 입력입니다.');
  //             }
  //         })
  //     },
  //     [state, onChangeInput, changeId]
  // );
  // const onChange = useCallback(
  //     input=>{
  //         onChangeInput(input);
  //         console.log(input);
  //     },
  //     [onChangeInput]
  // )
  return <Login onSubmit={onSubmit} onChange={onChange} state={state} />;
};

export default LoginContainer;
