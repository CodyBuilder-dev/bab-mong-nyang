import React from "react";
import { Rating, Skeleton } from "@material-ui/lab";
import {
  makeStyles,
  Box,
  CardMedia,
  withStyles,
  Typography
} from "@material-ui/core";

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
  }
}));
// ==== 사료 정보 요약 ====
const testData = {
  feedImg: "https://m.pinyo.kr/web/product/big/201902/003ca6a1dc0a49d5149c8d110e5e5aaf.png",
  feedName: "스몰배치 치킨 바이트",
  feedScore: "4.3", // 사료에 대해 유저들이 평가한 점수 평균 5점만점
  votedPeopleNum: "10", // 사료에 대해 평가한 유저들의 수 (리뷰 달린 수)
};
// ===================
const FeedInfo = props => {
  const classes = useStyles();
  return (
    <>
      {false ? (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      ) : (
        <CardMedia
          className={classes.media}
          image={testData.feedImg}
          title="Feed Image"
        />
      )}
      <Box>
        <Typography variant="subtitle2" display="block">
          {testData.feedName}
        </Typography>
      </Box>
      <Box className={classes.score}>
        <StyledRating
          name="feed-score"
          value={testData.feedScore}
          size="small"
          precision={0.5}
          readOnly
        />
        <Typography variant="subtitle2" display="block">
          {testData.feedScore}
        </Typography>
        <Typography variant="caption" display="block">
          ({testData.votedPeopleNum})
        </Typography>
      </Box>
    </>
  );
};

export default FeedInfo;
