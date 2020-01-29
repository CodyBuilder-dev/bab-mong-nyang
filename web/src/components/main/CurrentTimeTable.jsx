import React from "react";
import MaterialTable, { MTableBody } from "material-table";
import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  page: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //color : lightBlue[300]
  }
}));
const GlobalCss = withStyles({
  "@global": {
    ".MuiTable-root": {
      borderCollapse: "separate",
      borderSpacing: "0px 15px"
    }
  }
})(() => null);
const CurrentTimeTable = ({ props }) => {
  const classes = useStyles();
  const currentID = useSelector(state => state.store.currentID);
  console.log(currentID);
  const [state, setState] = React.useState({
    columns: [
      {
        title: "",
        field: "time",
        cellStyle: {
          textAlign: "left",
          border: "1px solid #FFFFFF",
          "border-right": "0px",
          "border-radius": "10px 0 0 10px"
        },
        headerStyle: {
          textAlign: "center",
          backgroundColor: lightBlue[300]
        }
      },
      {
        title: "",
        field: "status",
        lookup: { 0: "완료", 1: "남음" },
        cellStyle: {
          textAlign: "right",
          border: "1px solid #FFFFFF",
          width: "100px",
          "border-left": "0px",
          "border-radius": "0 10px 10px 0"
        },
        headerStyle: {
          textAlign: "center",
          backgroundColor: lightBlue[300]
        }
      }
    ],
    data: [
      { time: "08:00", status: 0 },
      { time: "11:00", status: 0 },
      { time: "13:00", status: 0 },
      { time: "15:00", status: 1 },
      { time: "17:00", status: 1 }
    ]
  });

  return (
    <div className={classes.page}>
      <p>{currentID}님 환영합니다!</p>
      <GlobalCss />
      <MaterialTable
        // icons ={Icons}
        title="배식상황"
        columns={state.columns}
        data={state.data}
        options={{
          search: false,
          paging: false,
          sorting: false,
          rowStyle: {
            backgroundColor: "#EEE"
          }
        }}
        style={{
          width: "80%",
          maxWidth: "550px",
          padding: "10px",
          backgroundColor: lightBlue[300]
        }}
      />
    </div>
  );
};

export default CurrentTimeTable;
