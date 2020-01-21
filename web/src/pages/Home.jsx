import React from "react";
import Layout from '../components/layout/Layout';
import Hellocat from "../hellocat.png";
import {makeStyles, Button, Popover} from "@material-ui/core";
const useStyles = makeStyles(theme => ({

}));

const Home = props =>{
    const classes = useStyles();
    const buttonClick = event =>{
        props.history.push('/login');
    }
    return(
        <>
            <img src = {Hellocat}/>
            <p>Hello, This is Auto IoT Servent System</p>
            <Button  color="primary"  onClick={buttonClick} >
            시작하기
            </Button>
            {/* 
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical : 'center',
                    horizontal : 'center',
                }}
                transformOrigin={{
                    vertical:'center',
                    horizontal: 'center',
                }}
            >
                <Login/>
            </Popover>
            */}
        </>
    );
};

export default Home;