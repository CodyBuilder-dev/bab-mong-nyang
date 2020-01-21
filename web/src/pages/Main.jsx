import React from "react";
import Layout from '../components/layout/LayoutMain';
import CurTimeTable from "../components/main/CurrentTimeTable";
import DeviceSelect from "../components/main/DeviceSelect";


import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles(theme => ({}));

const Main = (props) => {
  const classes = useStyles();
  const index = 0;
  console.log(props);
  return (
      <>
        <DeviceSelect />
        <CurTimeTable />
      </>
  );
};

export default Main;
