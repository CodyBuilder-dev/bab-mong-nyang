import React ,{useState} from "react";
import MaterialTable from "material-table";
import { makeStyles ,Switch } from "@material-ui/core";
import Icons from "./TableIcons";
import {useFetchData} from "../custom-hooks/custom-hooks";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
const useStyles = makeStyles(theme => ({
  page: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));
const TimeTable = props => {
  const classes = useStyles();
  const store = useSelector(state => state.store, []);
  const {input, isLoading,setIsLoading,dataFetch} = useFetchData('/setting/','timetable');
  useEffect(()=>{
    dataFetch(store.url + '/setting/'+store.u_Last,'timetable');
  },[store])
  return (
    <div className={classes.page}>
      {isLoading ? (
        <div> Loading.....</div>
      ):(
      <MaterialTable
        icons={Icons}
        title="배식설정"
        columns={[
          {
            title: "시간",
            field: "s_Time"
          },
          {
            title: "제공량(g)",
            field: "s_Amount"
          },
          {
            title: "적용",
            field: "s_Activate",
            sorting : false,
            
            headerStyle : {
              borderBottom : "0px"
            },
            editComponent: () => (
              <p></p>
            ),
            render: rowData => <Switch
            checked={rowData !== undefined && rowData.s_Activate === 1}
            color = "primary"
            onChange={async(event) => {
              setIsLoading(true);
              if(rowData === undefined){
                console.log(rowData);
                console.log(event.target);
                rowData = {s_Activate : 1};
                await setIsLoading(false);
              }else{
                console.log(rowData);
                console.log(event.target);
                rowData.s_Activate = event.target.checked ? 1 : 0;
                const result = await axios.put(store.url+'/setting',rowData,{headers : store.headers});
                if(result.data){
                  console.log(result.data)
                setIsLoading(false);
                }
              }
              
            }}
            inputProps={{ 'aria-label': 'checkbox with default color' }}/>
          }
        ]}
        data={input}
        options={{
          search: false,
          paging: false,
          actionsColumnIndex: 2,
          rowStyle: {
            marginTop: "10px"
          }
        }}
        localization={{
          header: {
            actions: "수정/제거"
          }
        }}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(async() => {
                console.log("add");
                resolve();
                setIsLoading(true);
                newData = {
                  ...newData,
                  d_No : store.u_Last,
                  s_Activate : 0
                }
                console.log(newData);
                const result = await axios.post(store.url + '/setting/',newData,{headers : store.headers});
                if(result.data){
                  dataFetch(store.url + '/setting/'+store.u_Last,'timetable');
                  setIsLoading(false);
                } else{
                  alert("중복된 시간이 이미 존재합니다.");
                  setIsLoading(false);
                }
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(async () => {
                resolve();
                setIsLoading(true);
                console.log(newData);
                const result = await axios.put(store.url + '/setting', newData,{headers:store.headers});
                if(result.data){
                  setIsLoading(false);
                  dataFetch(store.url + '/setting/'+store.u_Last,'timetable');
                }else{
                  alert('실패');
                  setIsLoading(false);
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(async () => {
                resolve();
                setIsLoading(true);
                //const result = await axios({method : "DELETE", url : store.url +'/setting/'+oldData.s_No, headers : store.headers})
                const result = await axios.delete(store.url + '/setting/'+oldData.s_No,{headers:store.headers});
                if(result.data){
                  setIsLoading(false);
                  dataFetch(store.url + '/setting/'+store.u_Last,'timetable');
                }else{
                  alert("실패");
                  setIsLoading(false);
                }
              }, 600);
            })
        }}
      />
      )}
    </div>
  );
};

export default TimeTable;
