import React,{useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Login from '../pages/Login';
import { submitLogin, changeInput ,submitLogout} from '../modules/login';

const LoginContainer = (props) => {
    const {input} = useSelector(state => state.login, []);
    const logedin = useSelector(state => state.login.state.logedin,[]);
    const dispatch = useDispatch();
    const changeId = useCallback(id => dispatch(submitLogin(id)),[dispatch]);
    const onChangeInput = useCallback(id => dispatch(changeInput(id)),[dispatch]);
    const onlogout = useCallback(()=>dispatch(submitLogout()),[dispatch]);
    const onSubmit = useCallback(
        e=>{
            changeId(input);
            onChangeInput('');
            console.log(props);
            props.history.push('/main');
        },
        [input, onChangeInput, changeId]
    )
    const onChange = useCallback(
        e=>{
            onChangeInput(e.target.value);
        },
        [onChangeInput]
    )
    return (
        <>
        <Login props = {props} onSubmit = {onSubmit} onChange = {onChange} input = {input} logedin = {logedin}/>
        </>
    );
    
};

export default LoginContainer;