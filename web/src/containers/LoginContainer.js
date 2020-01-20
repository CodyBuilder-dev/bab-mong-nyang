import React,{useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Login from '../Home/Login';
import { submitLogin, changeInput ,submitLogout} from '../modules/login';
import CurrentTimeTable from '../Main/CurrentTimeTable';

const LoginContainer = (props) => {
    const {input, curId} = useSelector(state => state.login, []);
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
    const onLogout = useCallback(
        e=>{
            onlogout();
            props.history.push('/login');
        },
        [submitLogout]
    )
    return (
        <>
        <Login onSubmit = {onSubmit} onChange = {onChange} input = {input}/>
        </>
    );
    
};

export default LoginContainer;