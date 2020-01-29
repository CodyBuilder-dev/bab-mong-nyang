import React from "react";
import MaterialTable from "material-table";
import { makeStyles, Button } from "@material-ui/core";
import Icons from "../set/TableIcons";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {useFetchData} from "../custom-hooks/custom-hooks"
const useStyles = makeStyles(theme => ({
  page: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const DeviceListTable = ({props, onClickRowEvent}) => {
  const classes = useStyles();
  const store = useSelector(state => state.store,[]);
  const {input, isLoading} = useFetchData(store.url + '/device/'+store.currentUserNo,'device');
  return(
    <div className = {classes.page}>
      {isLoading ? (
        <div> Loading.....</div>
      ):(
        <div>
        <MaterialTable
          icons={Icons}
          title ="목록"
          columns={[
            {
              title: "번호",
              field: "d_No",
              hidden : true
            },
            {
              title: "이름",
              field: "d_Name"
            },
            {
              title: "나이",
              field: "d_Age"
            },
            {
              title: "종",
              field: "d_Species"
            }]}
          data={input}
          options={{
            search: false,
            paging: false,
            rowStyle: {
              marginTop: "10px"
            }
          }}
          onRowClick = {(event,rowData)=>{
            onClickRowEvent(rowData.d_No);
          }}
        />
        </div>
      )}
    </div>
  );

};
export default DeviceListTable;