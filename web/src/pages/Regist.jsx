import React from "react";
import {makeStyles, TextField, FormControlLabel, Checkbox, Button} from "@material-ui/core";

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

const Regist = props =>{
    const classes = useStyles();
    return(
        <div className={classes.page}>
            <h3>반려동물의 정보를 입력해주세요</h3>
            <form className={classes.inputText} noValidate autoComplete="off">
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
                    id = "sex"
                    label = "성별"
                    name = "sex"
                />
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "birth"
                    label = "생년월일"
                    name = "birth"
                    autoComplete="birth"
                />
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "weight"
                    label = "몸무게"
                    name = "weight"
                    
                />
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "serialNum"
                    label = "일려번호 S/N"
                    name = "serialNum"
                    
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    기기 등록
                </Button>
            </form>
        </div>
    );
};

export default Regist;