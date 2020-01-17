import React from "react";
import Layout from "../layout/Layout";
import Hellocat from "../hellocat.png";
import {makeStyles, Button, Popover} from "@material-ui/core";
import Login from "../Home/Login"
import axios from "axios";
const useStyles = makeStyles(theme => ({

}));

const Home = props =>{
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const buttonClick = event =>{
        axios.get('http://70.12.246.68:3000/list')
        .then(res => {
            console.log(res);
        })
        
    }
    return(
        <Layout>
            <img src = {Hellocat}/>
            <p>Hello, This is Auto IoT Servent System</p>
            <Button  color="primary" aria-describedby={id} onClick={buttonClick} >
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
        </Layout>
    );
};

export default Home;