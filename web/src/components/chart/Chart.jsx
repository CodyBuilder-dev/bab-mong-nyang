import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./Chart.css";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";
import { BarChart } from "./index";
import { useFetchData } from "../custom-hooks/custom-hooks";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  height: 30vh;
  width: 100%;
  padding: 20px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 5px;
  background-color: #f7cac9;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 640px) {
    width: 100%;
    box-shadow: none;
  }
`;

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%",
    maxWidth: 400,
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const Chart = props => {
  const classes = useStyles();
  const [centerBarIndex, setcenterBarIndex] = useState(2);
  // const [scroller, setScroller] = useState(window.innerWidth > 400)
  const store = useSelector(state => state.store, []);

  const { input, dataFetch, isLoading } = useFetchData(
    "/logdata/chart/",
    "chart"
  );
  useEffect(() => {
    setcenterBarIndex(input.length - 1);
  }, [input]);
  useEffect(() => {
    dataFetch(store.url + "/logdata/chart/" + store.u_Last, "chart");
  }, [store.u_Last])
  let avg = 0;

  return (
    <div className={classes.page}>
      {isLoading ? (
        <div>dsad</div>
      ) : input.length === undefined ? (
        <div>...</div>
      ) : (
        <Card className={classes.card} variant="outlined">
          <Wrapper>
            <BarChart
              bars={input}
              barWidth={35}
              barSpace={8}
              centerBarIndex={centerBarIndex}
              onBarSelect={selectedBar => {setcenterBarIndex(selectedBar)}}
              selectCenterBarOnScroll={true}
              showScroll={true}
            />
          </Wrapper>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {input[centerBarIndex].label.slice(0, 2)}월{" "}
              {input[centerBarIndex].label.slice(3, 5)}일
            </Typography>
            <Typography variant="h5" component="h2">
              {input[centerBarIndex].items[0].value} / {250} Kcal
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              (섭취량 / 설정량)
            </Typography>
            <Typography variant="body1" component="p">
              {/* {avg - 100 > 0
                ? `${avg - 100}%만큼 더 먹었어요`
                : avg - 100 === 0
                ? "완벽해요"
                : `${100 - avg}% 만큼 덜 먹었어요`} */}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default Chart;
