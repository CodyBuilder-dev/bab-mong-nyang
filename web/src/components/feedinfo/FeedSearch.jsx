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
import { Autocomplete } from "@material-ui/lab";

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

const testData = [
  {
    id: 1,
    name: "ANF 홀리스틱 그레인프리 Dog 양고기 & 감자",
    company: "에이엔에프",
  },
  {
    id: 2,
    name: "두번째 사료",
    company: "로얄"
  },
  {
    id: 3,
    name: "맛없는 사료",
    company: "이름없음"
  }
]
const FeedSearch = props => {

  return (
    <>
    
    </>
  )
}
export default FeedSearch