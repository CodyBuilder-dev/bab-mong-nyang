import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core";
import Icons from "./TableIcons";

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
  const [state, setState] = React.useState({
    columns: [
      {
        title: "시간",
        field: "time"
      },
      {
        title: "제공량(g)",
        field: "weight"
      }
    ],
    data: [
      { time: "08:00", weight: "15g" },
      { time: "11:00", weight: "15g" },
      { time: "13:00", weight: "15g" },
      { time: "15:00", weight: "25g" },
      { time: "17:00", weight: "35g" }
    ]
  });

  return (
    <div className={classes.page}>
      <MaterialTable
        icons={Icons}
        title="배식설정"
        columns={state.columns}
        data={state.data}
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
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    </div>
  );
};

export default TimeTable;
