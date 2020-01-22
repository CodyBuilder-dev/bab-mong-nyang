import React from "react";
import {makeStyles, Button, Popover} from "@material-ui/core";
import TimeTable from "../components/set/TimeTable";
import SettingTable from "../components/set/SettingTable";
const useStyles = makeStyles(theme => ({

}));

const Setting = props =>{
    const classes = useStyles();
    return(
        <>
            {/* <Header /> */}
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
        </>
    );
};

export default Setting;