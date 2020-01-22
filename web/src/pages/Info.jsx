import React from "react";
import Layout from '../components/layout/LayoutMain';
import {makeStyles, Button, Popover} from "@material-ui/core";
import User from '../components/info/User';
const Info = props => {
    return (
        <Layout>
            <User/>
        </Layout>
    );
};

export default Info;