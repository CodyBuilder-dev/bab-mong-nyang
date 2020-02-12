import React from "react";
import {
  makeStyles,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActionArea
} from "@material-ui/core";
import Caticon from "../../assets/icons/caticon2.png"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useFetchData, useStore } from "../custom-hooks/custom-hooks";
const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  gridContainer: {
    width: "90vw",
    maxWidth: "500px"
  },
  paper: {
    padding: theme.spacing(1)
  },
  media: {
    height: "50px"
  }
}));

const DeviceListTable = ({ props }) => {
  const classes = useStyles();
  const { onChangeStore } = useStore();
  const { input, isLoading } = useFetchData("/device/", "devicelist");
  return (
    <div className={classes.page}>
      {isLoading ? (
        <div> Loading.....</div>
      ) : (
        <div className={classes.gridContainer}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h6">밥그릇</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            paddingBottom="10px"
          >
            <IconButton
              style={{ padding: "0px" }}
              aria-label="add"
              color="primary"
              onClick={e => props.history.push("regist")}
            >
              <AddCircleOutlineIcon />
              <Typography>기기 등록</Typography>
            </IconButton>
          </Box>
          <Grid container spacing={2} alignItems="center" justify="flex-start">
            {input.map(device =>
              device === undefined ? (
                <></>
              ) : (
                <>
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    key={device.d_No}
                    alignItems="center"
                  >
                    <Card
                      onClick={e => {
                        onChangeStore({ currentDeviceNo: device.d_No }, "", "");
                        props.history.push("/devicemodify");
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                        component="img"
                          className={classes.media}
                          image={Caticon}
                        />
                        <CardContent>
                          <Typography component="p" variant="body1">
                            {device.d_Name}
                          </Typography>
                          <Typography component="p" variant="caption">
                            {device.d_Species}
                          </Typography>
                          <Typography component="p" variant="caption">
                            나이:{" "}
                            {parseInt(device.d_Age / 12)
                              ? `${parseInt(device.d_Age / 12)}년 `
                              : ""}
                            {device.d_Age % 12}개월
                          </Typography>
                          <Typography component="p" variant="caption">
                            몸무게: {device.d_Weight} kg
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    {/* <Paper
                      className={classes.paper}
                      onClick={e => {
                        onChangeStore({ currentDeviceNo: device.d_No }, "", "");
                        props.history.push("/devicemodify");
                      }}
                    >
                      <Typography component="p" variant="body1">
                        {device.d_Name}
                      </Typography>
                      <Typography component="p" variant="caption">
                        {device.d_Species}
                      </Typography>
                      <Typography component="p" variant="caption">
                        나이:{" "}
                        {parseInt(device.d_Age / 12)
                          ? `${parseInt(device.d_Age / 12)}년 `
                          : ""}
                        {device.d_Age % 12}개월
                      </Typography>
                      <Typography component="p" variant="caption">
                        몸무게: {device.d_Weight} kg
                      </Typography>
                    </Paper> */}
                  </Grid>
                </>
              )
            )}
            <Grid item xs={6} sm={4} alignItems="center">
              <Paper
                className={classes.paper}
                onClick={e => props.history.push("/regist")}
              >
                <Typography>기기 등록</Typography>
              </Paper>
            </Grid>
          </Grid>
          {/* {console.log(input)}
          <MaterialTable
            icons={Icons}
            title="목록"
            columns={[
              {
                title: "번호",
                field: "d_No",
                hidden: true
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
              },
              {
                title: "무게",
                field: "d_Weight"
              }
            ]}
            data={input}
            options={{
              search: false,
              paging: false,
              rowStyle: {
                marginTop: "10px"
              }
            }}
            onRowClick={(event, rowData) => {
              onChangeStore({ currentDeviceNo: rowData.d_No }, "", "");
              props.history.push("/devicemodify");
            }}
            actions={[
              {
                icon: Icons.Add,
                tooltip: "기기등록",
                isFreeAction: true,
                onClick: event => props.history.push("regist")
              }
            ]}
          /> */}
        </div>
      )}
    </div>
  );
};
export default DeviceListTable;
