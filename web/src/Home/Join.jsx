import React, {useState} from "react";
import Layout from "../layout/Layout";
import {makeStyles, TextField, FormControlLabel, Checkbox, Button} from "@material-ui/core";
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    submit : {
        margin : theme.spacing(3,0,2),
        lineHeight : '2.5rem',
        fontSize : 16,
    },
    page : {
        marginTop: theme.spacing(6),
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

const Join = () =>{
    const classes = useStyles();
    // const [name, setName] = useState('');
    // const [id, setId] = useState('');
    // const [pw, setPw] = useState('');
    // const [email, setEmail] = useState('');
    // const onChangeName = e => {
    //     setName(e.target.value);
    // }
    // const onChangeId = e => {
    //     setId(e.target.value);
    // }
    // const onChangePw = e => {
    //     setPw(e.target.value);
    // }
    // const onChangeEmail = e => {
    //     setEmail(e.target.value);
    // }
    // const handleSubmit = (event) =>{
    //     axios({
    //         url : '',
    //         method : 'post',
    //         data : this.state,
    //     }).then(
    //         response => {
    //             console.log("잘 전달 됨");
    //         }
    //     ).catch(error => {
    //         console.log(error);
    //     })

    // }
    
    

    return(
        <div className={classes.page}>
            <h2>회원가입</h2>
            
            <div className={classes.inputText}>
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "name"
                    label = "이름"
                    name = "name"
                    autoFocus
                />
                
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "id"
                    label = "아이디"
                    name = "id"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="pw"
                    label="비밀번호 "
                    type="password"
                    id="pw"
                    autoComplete="current-password"
                />
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "email"
                    label = "이메일"
                    name = "email"
                    autoComplete="email"
                />
                <Button
                    
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    //onClick = {submitRegist}
                >
                    회원 가입
                </Button>
            </div>
        </div>
    );
};

export default Join;