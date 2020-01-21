import React from "react";
import Layout from '../components/layout/LayoutMain';
import {makeStyles, Button, Popover} from "@material-ui/core";
import TimeTable from "../components/set/TimeTable";
import SettingTable from "../components/set/SettingTable";
import Header from "../components/layout/Header";
const useStyles = makeStyles(theme => ({

}));

const Setting = props =>{
    const classes = useStyles();
    return(
        <Layout>
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