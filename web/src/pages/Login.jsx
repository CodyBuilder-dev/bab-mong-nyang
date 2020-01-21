import React, { useEffect } from "react";
import Layout from '../components/layout/Layout';
import {makeStyles, TextField, FormControlLabel, Checkbox, Button} from "@material-ui/core";
import axios from 'axios'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    submit : {
        margin : theme.spacing(1,0,1),
    },
    page : {
        marginTop: theme.spacing(8),
        marginBottom : theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputText : {
        width: '300px', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

const Login = ({ props  , onSubmit, onChange, input, logedin }) =>{
    const classes = useStyles();
    useEffect(()=>{
        console.log("마운트될때 실행");
        console.log(logedin);
        console.log(props);
        if(logedin){
            props.history.goBack();
        }
    }, []);
    const buttonClick = event => {
        //axios.post('http://70.12.246.71:3000/login',{
        //    id,
        //    pw
        //})
        //.then(res => {
        //    console.log(res);
        //    let validate = res.data;
        //    if(validate){
        //        onSubmit(id);
        //        props.history.push('/main');
        //    }else{
        //        alert('잘못된 입력입니다.');
        //    }
        //})
    }; 
    return(
        <div className={classes.page}>
            <h2>로그인</h2>
            <p>{input}</p>
            <div className={classes.inputText}>
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "id"
                    label = "아이디"
                    name = "id"
                    autoFocus
                    value = {input}
                    onChange = {onChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="비밀번호 "
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="아이디 저장"
                    className = {classes.label}
                />
                <Button
                    
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick = {onSubmit}
                    
                >
                    로그인
                </Button>
                <Link to='/join' style = {{textDecoration : 'none'}} >
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    회원가입
                </Button></Link>
            </div>
        </div>
    );
};

export default Login;