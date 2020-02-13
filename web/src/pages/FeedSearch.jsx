import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import SearchBar from "../components/feedsearch/SearchBar";
import SearchResult from "../components/feedsearch/SearchResult";
import {
  useFetchData,
  useStore
} from "../components/custom-hooks/custom-hooks";
import { useEffect } from "react";
const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
})); // #00b08b

const Record = props => {
  const classes = useStyles();
  const { input, dataFetch } = useFetchData("/feed", "feed_all");
  const { store } = useStore();
  useEffect(() => {
    dataFetch(store.url + "/feed", "feed_all")
  }, [store])
  return (
    <div className={classes.page}>
      <SearchBar data={input} />
      {store.options === undefined ? (
        <></>
      ) : store.options.length === 0 ? (
        <>
          <Typography variant="body1">검색 결과가 없습니다.</Typography>
        </>
      ) : (
        <SearchResult data={store.options} />
      )}
    </div>
  );
};

export default Record;
