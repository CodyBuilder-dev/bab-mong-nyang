import React from "react";
import DeviceListTableContainer from "../containers/DeviceListTableContainer";


const Device = props => {
  return (
    <>
      {/* <SettingTable /> */}
      <DeviceListTableContainer props = {props}  />
    </>
  );
};

export default Device;
