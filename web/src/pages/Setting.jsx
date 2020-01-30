import React from "react";
import TimeTable from "../components/set/TimeTable";
import SettingTable from "../components/set/SettingTable";
import DeviceSelect from "../components/main/DeviceSelect"
const Setting = props => {
  return (
    <>
      <DeviceSelect/>
      {/* <SettingTable /> */}
      <TimeTable />
    </>
  );
};

export default Setting;
