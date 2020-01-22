import React,{useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Login from '../pages/Login';
import { submitLogin, changeInput ,submitLogout} from '../modules/login';
import axios from 'axios'
const LoginContainer = (props)=> {
    
    const state = useSelector(state => state.login.state, []);
    const url = 'http://70.12.246.68:3000';
    const dispatch = useDispatch();
    const changeId = useCallback(id => dispatch(submitLogin(id)),[dispatch]);
    const onChangeInput = useCallback(input => dispatch(changeInput(input)),[dispatch]);
    const onlogout = useCallback(()=>dispatch(submitLogout()),[dispatch]);
    const onSubmit = useCallback(
        e=>{
            axios.post(url+'/user/login',{
                u_Id: state.inputId,
                u_Pw: state.inputPw
            }).then(res =>{
                console.log(res);
                let validate = res.data;
                if(validate){
                    changeId(state.inputId);
                    props.history.push('/main');
                }else{
                    alert('잘못된 입력입니다.');
                }
            })
        },
        [state, onChangeInput, changeId]
    );
    const onChange = useCallback(
        input=>{
            onChangeInput(input);
            console.log(input);
        },
        [onChangeInput]
    )
    return (
        <Login onSubmit = {onSubmit} onChange = {onChange} state = {state}/>
    )
};

export default LoginContainer;