import React from "react";
//import DeviceListTableContainer from "../containers/DeviceListTableContainer";
import DeviceListTable from "../components/device/DeviceListTable"

const Device = props => {
  return (
    <>
      {/* <SettingTable /> */}
      <DeviceListTable props = {props}  />
    </>
  );
};

export default Device;
