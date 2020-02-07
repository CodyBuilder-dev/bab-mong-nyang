import React,{useEffect} from "react";
import CurTimeTable from "../components/main/CurrentTimeTable";
import DeviceSelect from "../components/main/DeviceSelect";
import DirectFeedButton from "../components/main/DirectFeedButton"
//import { useSelector } from "react-redux";

const Main =  props => {
  return(  
    <>
      <DeviceSelect/>
      <CurTimeTable />
      {/* <DirectFeedButton/> */}
    </>
  );
};

export default Main;
