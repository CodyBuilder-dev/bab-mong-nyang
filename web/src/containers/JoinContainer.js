import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Join from "../pages/Join";
import axios from "axios";
import {
  changeInput,
  submitForm,
  validateForm,
  setCurrentID
} from "../modules/store";
const JoinContainer = props => {
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
      if (
        input.pwcon === "" ||
        input.u_Pw === input.pwcon ||
        input.pwcon === undefined
      ) {
        input.pwValidated = true;
      } else {
        input.pwValidated = false;
      }
      change_Input(input);
      console.log(input);
    },
    [change_Input]
  );
  const onSubmit = useCallback(
    e => {
      if (state.pwcon === "") {
        change_Input({
          u_Id: state.u_Id,
          u_Pw: state.u_Pw,
          pwcon: state.pwcon,
          pwValidated: false,
          idValidated: true,
          u_Email: state.u_Email,
          u_Name: state.u_Name
        });
        console.log(state);
      } else {
        console.log("axios요청 보냄");
        axios
          .post(state.url + "/user", state.input)
          .then(res => {
            let flag = res.data;
            console.log(flag);
            if (flag) {
              submit_Form();
              alert("회원가입 성공");
              props.history.push("/login");
            }
          })
          .catch(error => {
            alert("회원가입 실패");
          });
      }
    },
    [submit_Form, state]
  );
  const onValidateID = useCallback(() => {
    axios.get(state.url + "/user/idCheck/" + state.input.u_Id).then(res => {
      console.log(res.data);
      change_Input({ ...state.input, idValidated: res.data });
    });
  });
  return (
    <Join
      state={state}
      onChange={onChange}
      onSubmit={onSubmit}
      onValidateID={onValidateID}
    ></Join>
  );
};
export default JoinContainer;
