import React from "react";
import {
  makeStyles,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  withStyles
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import SearchBar from "../components/feedsearch/SearchBar";
import SearchResult from "../components/feedsearch/SearchResult";
import {
  useFetchData,
  useStore
} from "../components/custom-hooks/custom-hooks";
import { useEffect } from "react";
import Slider from "react-slick";
import FeedSlide from "../components/feedsearch/FeedSlide";

const StyledRating = withStyles({
  sizeSmall: {
    fontSize: "0.7rem"
  }
})(Rating);
const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  slider: {
    width: "100%",
    maxWidth: "500px"
  },
  media: {
    height: "70px",
    width: "50px"
  },
  score: {
    height: "100%",
    // width: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
})); // #00b08b

const Record = props => {
  const classes = useStyles();
  const { input, dataFetch } = useFetchData("/feed", "feed_all");
  const { store } = useStore();
  const [data, setData] = React.useState(input.slice(0, 10));

  useEffect(() => {
    dataFetch(store.url + "/feed", "feed_all");
    setData(input.slice(0, 10));
    console.log(data);
  }, [store]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    lazyLoad: true
  };
  return (
    <div className={classes.page}>
      <SearchBar data={input} />
      {store.options === undefined ? (
        <></>
      ) : store.options.length === 0 ? (
        <>
          <Typography variant="body1">
            사료명 또는 제조사 이름으로 검색하세요!
          </Typography>
          <Typography variant="subtitle2">추천사료</Typography>
          <div className={classes.slider}>
            <Box p={"40px"}>
              <FeedSlide input={input} />
            </Box>
          </div>
        </>
      ) : (
        <SearchResult data={store.options} />
      )}
    </div>
  );
};

export default Record;
