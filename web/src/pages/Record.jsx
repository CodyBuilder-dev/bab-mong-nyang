import React, { useEffect, useState } from "react";
import Chart from "../components/chart/Chart";
import DeviceSelect from "../components/main/DeviceSelect";
// import { useFetchData } from "../components/custom-hooks/custom-hooks";
// import { useSelector } from "react-redux";
const Record = props => {
  // const { input, dataFetch, isLoading } = useFetchData(
  //   "/logdata/chart/",
  //   "chart"
  // );
  // const store = useSelector(state => state.store, []);
  // const [centerBarIndex, setCenterBarIndex] = useState();
  // useEffect(() => {
  //   setCenterBarIndex(input.length - 1)
  //   // dataFetch(store.url + "/logdata/chart/" + store.u_Last, "chart");
  //   console.log(input);
  // }, [input]);
  return (
    <>
      <DeviceSelect />
      <Chart />
    </>
  );
};

export default Record;
