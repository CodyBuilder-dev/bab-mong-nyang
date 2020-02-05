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
  grid : {
    marginTop : "10px",
    padding : "2px"
  }
}));
// ==== 사료 정보 요약 ====
const testData = {
  feedImg:
    "https://m.pinyo.kr/web/product/big/201902/003ca6a1dc0a49d5149c8d110e5e5aaf.png",
  feedName: "스몰배치 치킨 바이트 닭&강황",
  feedScore: "4.3", // 사료에 대해 유저들이 평가한 점수 평균 5점만점
  votedPeopleNum: "10", // 사료에 대해 평가한 유저들의 수 (리뷰 달린 수)
  detail: [
    { key: "급여대상", value: "강아지" },
    { key: "제조사", value: "스몰배치" },
    { key: "유기농 여부", value: "YES" },
    { key: "제조국", value: "미국" },
    { key: "사료종목", value: "건식(반건식)" },
    { key: "급여연령", value: "전연령" }
  ]
};
// ===================
const FeedBasic = props => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
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
          <strong>{testData.feedName}</strong>
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
      <Box marginTop={1} borderTop={1} paddingTop={1}>
        <Grid container spacing={0} justify="flex-start" alignItems = "center">
          {testData.detail.map(item => (
            <>
              <Grid item xs={2} className = {classes.grid}>
                <Typography className={classes.key}>{item.key}</Typography>
              </Grid>
              <Grid item xs={4} className = {classes.grid}>
                <Typography className={classes.value}>{item.value}</Typography>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default FeedBasic;
