import React,{useEffect} from "react";
import {makeStyles, TextField,Button} from "@material-ui/core";
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom'
const useStyles = makeStyles(theme => ({
    page : {
        marginTop: theme.spacing(3),
        marginBottom : theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputText : {
        width: '300px', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit : {
        margin : theme.spacing(1,0,1),
        lineHeight : '2.5rem',
        fontSize : 16,
    }
}));
const User = props =>{
    const classes = useStyles();
    //const curid = useSelector(state => state.login.state.curid);
    // useEffect(()=>{
    //     // axios.post('http://',{
    //     //     u_Id : curid
    //     // }).then(res=>{
    //     //     input.email = res.data.email;
    //     //     input.name = res.data.name;
    //     // });
    //     input.name = '몰라';
    //     input.email = 'tmp@tmp.com';
    // },[])
    const [state, setState] = React.useState({
        id : 'curid',
        name : '몰라',
        email : 'tmp@tmp.com'
    })
    return(
        <div className = {classes.page}>
            <h2>내 정보</h2>
            <div className={classes.inputText}>
            <TextField
                id="outlined-read-only-input"
                label="이름"
                defaultValue={state.name}
                InputProps={{
                    readOnly: true,
                }}
                margin = "normal"
                fullWidth

                variant="outlined"
            />
            <TextField
                id="outlined-read-only-input"
                label="아이디"
                defaultValue={state.id}
                InputProps={{
                    readOnly: true,
                }}
                margin = "normal"
                fullWidth
                variant="outlined"
            />
            <TextField
                id="outlined-read-only-input"
                label="이메일"
                defaultValue={state.email}
                InputProps={{
                    readOnly: true,
                }}
                margin = "normal"
                fullWidth
                variant="outlined"
            />
            <Link to='/modify' style = {{textDecoration : 'none'}} >
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}  
                >
                    수정하기
                </Button>
            </Link>
            </div>
        </div>
    );

};
export default User;