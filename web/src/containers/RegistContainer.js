import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Regist from "../pages/Regist";
import axios from "axios";
import {
  changeInput,
  submitForm,
} from "../modules/store";
import { SentimentSatisfied } from "@material-ui/icons";
const RegistContainer = props => {
  const state = useSelector(state => state.store, []);
  const dispatch = useDispatch();
  const change_Input = useCallback(input => dispatch(changeInput(input)), [
    dispatch
  ]);
  const submit_Form = useCallback(() => dispatch(submitForm("")), []);
  //const validate_Form = useCallback(flag => dispatch(validateForm(flag)),[]);
  const onChange = useCallback(
    input => {
      //console.log('pwcon = '+  input.pwcon.length + ' pw = ' + input.u_Pw )
      change_Input(input);
      console.log(input);
    },
    [change_Input]
  );
  const onSubmit = useCallback(
     e => {
        console.log("axios요청 보냄");
        console.log(state.url);
        
        axios
          .post(state.url + "/device", state.input)
          .then(res => {
            let flag = res.data;
            console.log(flag);
            if (flag) {
              submit_Form();
              alert("기기 등록 성공");
              props.history.push("/device");
            }
            else{
              submit_Form();
              alert("모두 작성해주세요");
            }
          })
          .catch(error => {
            submit_Form();
            alert("기기 등록 실패");
          });
      },
    [submit_Form, state]
  );
  return (
    <Regist
      state={state}
      onChange={onChange}
      onSubmit={onSubmit}
    ></Regist>
  );
};
export default RegistContainer;
