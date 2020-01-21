import React, {useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { changeRegistInput, validateId, submitRegist } from '../modules/members';
import Join from '../pages/Join';
import axios from 'axios';

const JoinContainer = (props) =>{
    const state  = useSelector(state => state.members.state, []);
    const dispatch = useDispatch();
    const onChangeInput = useCallback(input => dispatch(changeRegistInput(input)),[dispatch]);
    const regist = useCallback(()=> dispatch(submitRegist()),[]);
    const onChange = useCallback(
        input=>{
            onChangeInput(input);
            console.log(input);
        },
        [onChangeInput]
    );
    const onSubmit = useCallback(
        e=>{
            console.log('axios요청 보냄');
            console.log(state);
            axios.post('http://70.12.246.68:3000/user/add',{
                u_Name : state.name,
                u_Id : state.id,
                u_Pw : state.pw,
                u_Email : state.email
            }).then(res =>{
                let validate = res.data;
                console.log(validate);
                if(validate){
                    regist();
                    alert('회원가입 성공');
                    props.history.push('/login');
                }
            }).catch(error => {
                
            })
        },
        [regist,state]
    )
    return (
        <Join  state = {state} onChange = {onChange} onSubmit = {onSubmit}></Join>
    );

};
export default JoinContainer;
