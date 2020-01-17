import React, {useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { changeRegistInput , submitRegist, SUBMIT_REGISTER, CHANGE_REGIST_INPUT } from '../modules/members';
import Join from '../Home/Join';

const JoinContainer = () =>{
    const  register  = useSelector(state => state);
    const dispatch = useDispatch();
    const onChange = useCallback(()=> dispatch({type : CHANGE_REGIST_INPUT}),[dispatch]);
    return (
        <Join changeRegistInput = {onChange} register = {register.register}></Join>
    );

};
export default JoinContainer;
