import React, {useState, useRef} from "react";
import Layout from "../components/layout/Layout";
import {makeStyles, TextField, FormControl, FormHelperText, Button, InputLabel, OutlinedInput} from "@material-ui/core";
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
    helperText : {
        color : 'red'
    }
}));

const Join = ({props, state, onChange, onSubmit, onValidateID}) =>{
    const classes = useStyles();
    let input  = state.input;
    const onChangeInput = (e) => {
        let key = e.target.name;
        switch(key){
            case 'name':
                input.u_Name = e.target.value;
                onChange(input);
                break;
            case 'id' :
                input.u_Id = e.target.value;
                onChange(input);
                break;
            case 'pw' :
                input.u_Pw = e.target.value;
                onChange(input);
                break;
            case 'email' :
                input.u_Email = e.target.value;
                onChange(input);
                break;
            case 'pwconfirm' :
                input.pwcon = e.target.value;
                onChange(input);
                break;
            default :
                console.log('default')
        }
    }
    const validateID = (e) =>{
        console.log(e);
        console.log(e.target);
        onValidateID();
    }
    // const [labelWidth, setLabelWidth] = React.useState(0);
    // const labelRef  = useRef(null);
    // React.useEffect(() => {
    //     setLabelWidth(labelRef.current.offsetWidth);
    //   }, []);
    return(
        <div className={classes.page}>
            <h2>회원가입</h2>
            
            <div className={classes.inputText}>
                <TextField           
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="id"
                    label="아이디"
                    id="id"
                    error = {(state.input.idValidated !== undefined && !state.input.idValidated)}
                    onChange = {onChangeInput}
                    onBlur = {validateID}
                    value = {state.input.id}
                    helperText = {(state.input.idValidated === undefined || state.input.idValidated) ? "" : "일치하지 않습니다"}
                    
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
                    onChange = {onChangeInput}
                    value = {state.input.u_Pw}
                />
               <TextField           
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="pwconfirm"
                    label="비밀번호 확인"
                    type="password"
                    id="pwconfirm"
                    autoComplete="current-password"
                    error = {(state.input.pwValidated !== undefined && !state.input.pwValidated)}
                    onChange = {onChangeInput}
                    value = {state.input.pwcon}
                    helperText = {(state.input.pwValidated === undefined || state.input.pwValidated) ? "" : "일치하지 않습니다"}
                    
                />
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "name"
                    label = "이름"
                    name = "name"
                    
                    onChange = {onChangeInput}
                    value = {state.input.u_Name}
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
                    onChange = {onChangeInput}
                    value={state.input.u_Email}
                />
                <Button
                    
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick = {onSubmit}
                >
                    회원 가입
                </Button>
            </div>
        </div>
    );
};

export default Join;