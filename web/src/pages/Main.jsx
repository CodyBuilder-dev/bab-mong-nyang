import React,{useEffect} from "react";
import CurTimeTable from "../components/main/CurrentTimeTable";
import DeviceSelect from "../components/main/DeviceSelect";

//import { useSelector } from "react-redux";

const Main =  props => {
  return(  
    <>
      <DeviceSelect/>
      <CurTimeTable />
    </>
  );
};

export default Main;
