import React from "react";
import { Rating, Skeleton } from "@material-ui/lab";
import {
  makeStyles,
  Box,
  CardMedia,
  withStyles,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";
import { useFetchData, useStore } from "../custom-hooks/custom-hooks";
import { useEffect } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const StyledRating = withStyles({
  sizeSmall: {
    fontSize: "1.2rem"
  }
})(Rating);

const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  media: {
    width: 150,
    height: 170
  },
  score: {
    height: "100%",
    width: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  key: {
    fontWeight: "bold",
    color: "#00b08b",
    fontSize: "9px"
  },
  value: {
    fontSize: "13px"
  },
  grid: {
    marginTop: "10px",
    padding: "2px"
  },
  ingList: {
    width: "100%",
    maxWidth: "500px"
  }
}));
const Ingredient = props => {
  // const f_Image =
  const classes = useStyles();
  const { input, isLoading, dataFetch } = useFetchData(
    "/feed/ingredient/" + props.f_No,
    "feedinfo"
  );
  const { store } = useStore();
  useEffect(() => {
    dataFetch(store.url + "/feed/ingredient/" + props.f_No, "feedinfo");
  }, [store]);

  return (
    <>
      <Box width="99%" maxWidth="500px">
        <Typography variant="h6" gutterBottom>
          재료 성분
        </Typography>
        <Divider />
      </Box>
      {isLoading ? (
        <>
          <Skeleton width="50px" />
          <Skeleton width="150px" />
        </>
      ) : (
        <>
          {console.log(input)}
          <List className={classes.ingList}>
            {input.warning ? (
              input.warning.count ? (
                input.warning.data.map((warnIng, idx) => (
                  // console.log(warnIng.i_Name)
                  <ListItem button key={`warning_${idx}`}>
                    <ListItemIcon>
                      <WarningIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText>
                      {warnIng.i_Name}
                      {warnIng.isAllergy ? (
                        <Box color="secondary.main" component="span">
                          {" "}
                          *
                        </Box>
                      ) : (
                        ""
                      )}
                    </ListItemText>
                    <ListItemIcon>
                      <ArrowForwardIosIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                  </ListItem>
                ))
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {input.doubt ? (
              input.doubt.count ? (
                input.doubt.data.map((doubtIng, idx) => (
                  // console.log(doubtIng.i_Name)
                  <ListItem
                    button
                    key={`doubt_${idx}`}
                    onClick={e => console.log(e)}
                  >
                    <ListItemIcon>
                      <Box
                        color="warning.main"
                        alignItems="center"
                        display="flex"
                      >
                        <ErrorIcon />
                      </Box>
                    </ListItemIcon>
                    <ListItemText>
                      {doubtIng.i_Name}
                      {doubtIng.isAllergy ? (
                        <Box color="secondary.main" component="span">
                          {" "}
                          *
                        </Box>
                      ) : (
                        ""
                      )}
                    </ListItemText>
                    <ListItemIcon>
                      <ArrowForwardIosIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                  </ListItem>
                ))
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {input.basic ? (
              input.basic.count ? (
                input.basic.data.map((basicIng, idx) => (
                  // console.log(basicIng.i_Name)
                  <ListItem button key={`basic_${idx}`}>
                    <ListItemIcon>
                      <Box
                        color="success.main"
                        alignItems="center"
                        display="flex"
                      >
                        <Brightness1Icon />
                      </Box>
                    </ListItemIcon>
                    <ListItemText>
                      {basicIng.i_Name}
                      {basicIng.isAllergy ? (
                        <Box color="secondary.main" component="span">
                          {" "}
                          *
                        </Box>
                      ) : (
                        ""
                      )}
                    </ListItemText>
                    <ListItemIcon>
                      <ArrowForwardIosIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                  </ListItem>
                ))
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </List>
        </>
      )}
    </>
  );
};

export default Ingredient;
