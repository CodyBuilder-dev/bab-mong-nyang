import React, {useEffect} from "react";
import Layout from "../components/layout/LayoutMain";
import {makeStyles, TextField, FormControlLabel, Checkbox, Button} from "@material-ui/core";
import axios from 'axios';
import {useSelector} from 'react-redux';

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
const Modify = ({props, state, onChange, onSubmit, onLoad}) =>{
    const classes = useStyles();
    const curid = useSelector(state => state.login.state.curid);
    let input  = {u_Id : state.u_Id , u_Pw : state.u_Pw, pwcon : state.pwcon, validated : true, u_Email : state.u_Email, u_Name : state.u_Name};
    useEffect(()=>{
        console.log('mount');
        onLoad(curid);
    },[])
    const onChangeInput = (e) => {
        console.log(input);
        let key = e.target.name;
        switch(key){
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
    

    return(
        <Layout>
            <div className={classes.page}>
                <h2>회원수정</h2>
                
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
                        onChange = {onChangeInput}
                        value = {state.u_Name}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    
                    <TextField 
                        variant="outlined"
                        margin="normal" 
                        required
                        fullWidth
                        id = "id"
                        label = "아이디"
                        name = "id"
                        onChange = {onChangeInput}
                        value = {state.u_Id}
                        InputProps={{
                            readOnly: true,
                        }}
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
                        value = {state.u_Pw}
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
                            error = {state.validated}
                            onChange = {onChangeInput}
                            value = {state.pwcon}
                            helperText = {state.validated ? "일치하지 않습니다" : ""}
                            
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
                        value={state.u_Email}
                    />
                    <Button
                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick = {onSubmit}
                    >
                        수정하기
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default Modify;