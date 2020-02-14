import React from "react";
import { Rating, Skeleton } from "@material-ui/lab";
import {
  makeStyles,
  Box,
  CardMedia,
  withStyles,
  Typography,
  Grid
} from "@material-ui/core";
import { useFetchData, useStore } from "../custom-hooks/custom-hooks";
import { useEffect } from "react";

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
  }
}));
const FeedBasic = props => {
  // const f_Image = 
  const classes = useStyles();
  const { input, isLoading, dataFetch } = useFetchData(
    "/feed/basic/" + props.f_No,
    "feedinfo"
    );
    const { store } = useStore();
    useEffect(() => {
      dataFetch(store.url + "/feed/basic/" + props.f_No, "feedinfo");
    }, [store]);
    
    return (
      <div className={classes.page}>
      {isLoading ? (
        <>
          <Skeleton animation="wave" variant="rect" className={classes.media} />
          <Box display="flex" flexDirection="column" alignItems="center">
            <Skeleton width="50px" />
            <Skeleton width="150px" />
          </Box>
        </>
      ) : (
        <>
          <CardMedia
            className={classes.media}
            image={`/images/${props.f_No}.jpg`}
            title="Feed Image"
            />
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="caption">{input.f_Manufacturer}</Typography>
            <Typography variant="subtitle2" display="block">
              <strong>{input.f_Name}</strong>
            </Typography>
          </Box>
          <Box className={classes.score}>
            <StyledRating
              name="feed-score"
              value={input.f_Rank}
              size="small"
              precision={0.5}
              readOnly
            />
            <Typography variant="subtitle2" display="block">
              {input.f_Rank}
            </Typography>
            <Typography variant="caption" display="block">
              ({input.f_Count})
            </Typography>
          </Box>
          <Box width="90vw" maxWidth="500px">
            <Grid
              container
              spacing={0}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={2} className={classes.grid}>
                <Typography className={classes.key}>지급대상</Typography>
              </Grid>
              <Grid item xs={4} className={classes.grid}>
                <Typography className={classes.value}>
                  {input.f_Species==="개" ? "강아지" : input.f_Species}
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography className={classes.key}>제조사</Typography>
              </Grid>
              <Grid item xs={4} className={classes.grid}>
                <Typography className={classes.value}>
                  {input.f_Manufacturer}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </div>
  );
};

export default FeedBasic;
