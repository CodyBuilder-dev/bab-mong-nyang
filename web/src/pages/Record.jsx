import React from "react";
import Chart from "../components/chart/Chart";
import DeviceSelect from "../components/main/DeviceSelect";

const Main = props => {
  return (
    <>
      <DeviceSelect />
      <Chart />
    </>
  );
};

export default Main;
