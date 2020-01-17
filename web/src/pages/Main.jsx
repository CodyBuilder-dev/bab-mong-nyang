import React from "react";
import Layout from "../layout/LayoutMain";
import CurTimeTable from "../Main/CurrentTimeTable";


import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles(theme => ({}));

const Main = props => {
  const classes = useStyles();
  const index = 0;

  return (
      <Layout>
        <CurTimeTable/>
      </Layout>
  );
};

export default Main;
