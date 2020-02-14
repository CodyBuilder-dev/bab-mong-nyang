import React,{useEffect} from "react";
import CurTimeTable from "../components/main/CurrentTimeTable";
import DeviceSelect from "../components/main/DeviceSelect";
import DirectFeedButton from "../components/main/DirectFeedButton"
//import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
const Main =  props => {
  const history = useHistory();
  const action = e => {
    history.replace("/main",[]);
  }
  return(  
    <>
      <DeviceSelect/>
      <CurTimeTable />
      {/* <button onClick = {action}>쿠아림느이라믄아ㅣ르ㅏㅣㅁㄴ으라ㅣㅁㄴ으ㅏㅣ름ㄴ아ㅣ르</button> */}
      {/* <DirectFeedButton/> */}
    </>
  );
};

export default Main;
