import React from "react";
import Layout from "../layout/Layout";
import {makeStyles, Button, Popover} from "@material-ui/core";
import TimeTable from "../Main/TimeTable";
import SettingTable from "../Main/SettingTable";
import Header from "../Main/Header";
const useStyles = makeStyles(theme => ({

}));

const Setting = props =>{
    const classes = useStyles();
    return(
        <Layout>
            <Header/>
            <SettingTable/>
            <TimeTable/>
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

export default Setting;