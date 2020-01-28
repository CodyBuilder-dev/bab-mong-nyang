import React, {useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { changeRegistInput , submitRegist, SUBMIT_REGISTER, CHANGE_REGIST_INPUT } from '../modules/members';
import Join from '../pages/Join';

const JoinContainer = () =>{
    const  register  = useSelector(state => state.members.state, []);
    const dispatch = useDispatch();
    //const onChange = useCallback(event=> dispatch(changeRegistInput(event.target.value)),[dispatch]);
    return (
        <Join  register = {register}></Join>
    );

};
export default JoinContainer;
