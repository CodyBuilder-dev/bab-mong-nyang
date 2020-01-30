import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeviceListTable from "../components/device/DeviceListTable";
import { setCurrentDeviceNo } from "../modules/store";

export const DeviceListTableContainer = (props) => {
  const state = useSelector(state => state.store, []);
  const dispatch = useDispatch();
  const setCurrentDevice_No = useCallback(No => dispatch(setCurrentDeviceNo(No)),[dispatch]);
  const onClickRowEvent = useCallback(
    input => {
      console.log(props);
      setCurrentDevice_No(input);
      props.history.push("/devicemodify");
    },
    []
  );
  return {onClickRowEvent}
};