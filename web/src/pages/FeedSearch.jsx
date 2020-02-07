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
    img: "http://banhae.pet/feed/1.jpg",
    company: "에이엔에프"
  },
  {
    id: 150,
    name: "뉴트리나 울트라 퍼포먼스",
    img: "http://banhae.pet/feed/150.jpg",
    company: "뉴트리나"
  },
  {
    id: 89,
    name: "게더 프리 런 치킨",
    img: "http://banhae.pet/feed/89.jpg",
    company: "게더"
  },
  {
    id: 600,
    name: "블루버팔로 윌더니스 어덜트 독",
    img: "http://banhae.pet/feed/600.jpg",
    company: "블루버팔로"
  }
];
const Record = props => {
  const classes = useStyles()
  return (
    <div className={classes.page}>
      <SearchBar data={testData}/>
      <SearchResult data={testData}/>
    </div>
  );
};

export default Record;
