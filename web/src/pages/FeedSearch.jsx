import React from "react";
import {makeStyles} from "@material-ui/core"
import SearchBar from "../components/feedsearch/SearchBar";
import SearchResult from "../components/feedsearch/SearchResult";
const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
}));// #00b08b

const testData = [
  {
    id: 1,
    name: "ANF 홀리스틱 그레인프리 Dog 양고기 & 감자",
    img: "https://picsum.photos/200/300.jpg",
    company: "에이엔에프"
  },
  {
    id: 2,
    name: "두번째 사료",
    img: "https://picsum.photos/200/300",
    company: "홀리스틱"
  },
  {
    id: 3,
    name: "맛없는 사료",
    img: "https://picsum.photos/200/300",
    company: "이름없음"
  },
  {
    id: 4,
    name: "차오츄르",
    img: "https://picsum.photos/200/300",
    company: "이시국"
  }
];
const Record = props => {
  const classes = useStyles()
  return (
    <div className={classes.page}>
      <SearchBar data={testData}/>
      {/* <SearchResult data={testData}/> */}
    </div>
  );
};

export default Record;
