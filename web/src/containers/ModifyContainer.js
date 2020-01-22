import React, {useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { changeRegistInput, validateId, submitRegist } from '../modules/members';
import Modify from '../pages/Modify';
import axios from 'axios';

const ModifyContainer = (props) =>{
    const state  = useSelector(state => state.members.state, []);
    //const curId = useSelector(state=>state.login.state.curId,[]);
    const url = 'http://70.12.246.68:3000';
    const dispatch = useDispatch();
    const onChangeInput = useCallback(input => dispatch(changeRegistInput(input)),[dispatch]);
    const regist = useCallback(()=> dispatch(submitRegist()),[]);
    const onChange = useCallback(
        input=>{
            console.log('pwcon = '+  input.pwcon.length + ' pw = ' + input.u_Pw )
            if(input.pwcon === '' || input.u_Pw === input.pwcon){
                input.validated = false;
            }else{
                input.validated = true;
            }
            onChangeInput(input);
            console.log(input);
        },
        [onChangeInput]
    );
    const onLoad = useCallback(
        (curId)=>{
            axios.get(url+'/user/'+curId)
            .then(res=>{
                console.log(res.data[0]);
                onChangeInput({u_Id : res.data[0].u_Id, u_Pw : '', u_Email : res.data[0].u_Email, pwcon : '' , u_Name : res.data[0].u_Name, validated :false});
            })
        }
    );
    const onSubmit = useCallback(
        e=>{
            if(state.pwcon ===''){
                onChangeInput({u_Id : state.u_Id , u_Pw : state.u_Pw, pwcon : state.pwcon, validated : true, u_Email : state.u_Email, u_Name : state.u_Name});
                console.log(state);
            }else{
                console.log('axios요청 보냄');
            axios.put(url+'/user/update',{
                u_Name : state.u_Name,
                u_Id : state.u_Id,
                u_Pw : state.u_Pw,
                u_Email : state.u_Email
            }).then(res =>{
                let validate = res.data;
                console.log(validate);
                if(validate){
                    regist();
                    alert('회원정보 수정');
                    //props.history.push('/login');
                }
            }).catch(error => {
                
            })
        }},
        [regist,state]
    );
    return (
        <Modify  state = {state} onChange = {onChange} onSubmit = {onSubmit} onLoad = {onLoad}></Modify>
    );

};
export default ModifyContainer;
