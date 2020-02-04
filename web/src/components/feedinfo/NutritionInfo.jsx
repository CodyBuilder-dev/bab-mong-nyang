import React from "react";
import {
  makeStyles,
  Box,
  CardMedia,
  withStyles,
  Typography,
  Divider,
  Grid
} from "@material-ui/core";

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
// ==== 사료 영양 정보 ==================
const testData = {
  nutritions: [
    { ingNm: "조단백", percent: 57.8 },
    { ingNm: "조지방", percent: 27.5 },
    { ingNm: "조섬유", percent: 1.9 },
    { ingNm: "조회분", percent: 8 },
    { ingNm: "수분", percent: 4.5 },
    { ingNm: "칼슘", percent: 0 },
    { ingNm: "인", percent: 0 },
    { ingNm: "오메가3", percent: 0 },
    { ingNm: "오메가6", percent: 0 }
  ],
  others: [{ ingNm: "탄수화물", percent: "(0 %) 이하" }]
};
// ======================================
const NutritionInfo = props => {
  const classes = useStyles();
  return (
    <>
      <Box width="99%" maxWidth="375px">
        <Typography variant="h6" gutterBottom>
          영양 성분
        </Typography>
        <Divider />
        <Grid container spacing={0} alignItems="center" justify="flex-start">
          {testData.nutritions.map(nutrition => (
            <>
              <Grid item xs={3}>
                <Typography variant="body2">{nutrition.ingNm}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="overline">{nutrition.percent}%</Typography>
              </Grid>
            </>
          ))}
        </Grid>
        <Grid container spacing={0} alignItems="center" justify="flex-start">
          {testData.others.map(other => (
            <>
              <Grid item xs={3}>
                <Typography variant="body2">
                  {testData.others.indexOf(other) === 0 ? "기타 영양소" : ""}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="overline">
                  {other.ingNm} {other.percent}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default NutritionInfo;
