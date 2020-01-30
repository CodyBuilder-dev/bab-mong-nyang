import React, { useState } from "react";
import styled from "styled-components";
// import "./Detail.css";
import {
  makeStyles,
  Container,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { BarChart } from "../components/chart/index";

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

const useStyles = makeStyles({
  card: {
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
  }
});
const bars = [
  {
    label: "01/01",
    // text: 8,
    items: [
      {
        value: 250,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/02",
    items: [
      {
        value: 140,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/03",
    items: [
      {
        value: 60,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/04",
    items: [
      {
        value: 270,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/05",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/06",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/07",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/08",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/09",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/10",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/11",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/12",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/13",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/14",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/15",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/16",
    items: [
      {
        value: 10,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/17",
    items: [
      {
        value: 3,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/18",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/19",
    items: [
      {
        value: 250,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/20",
    items: [
      {
        value: 140,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/21",
    items: [
      {
        value: 60,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/22",
    items: [
      {
        value: 270,
        color: "#0f4c81"
      }
    ]
  },
  {
    label: "01/23",
    items: [
      {
        value: 8,
        color: "#0f4c81"
      }
    ]
  }
];

const Chart = props => {
  const classes = useStyles();
  const [centerBarIndex, setcenterBarIndex] = useState(bars.length - 1);
  let avg = Math.round((bars[centerBarIndex].items[0].value / 250) * 100);
  // const [scroller, setScroller] = useState(window.innerWidth > 400)
  return (
    <>
      <Card className={classes.card} variant="outlined">
        <Wrapper>
          <BarChart
            bars={bars}
            barWidth={35}
            barSpace={8}
            centerBarIndex={centerBarIndex}
            onBarSelect={centerBarIndex => setcenterBarIndex(centerBarIndex)}
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
            {bars[centerBarIndex].label.slice(0, 2)}월{" "}
            {bars[centerBarIndex].label.slice(3, 5)}일
          </Typography>
          <Typography variant="h5" component="h2">
            {bars[centerBarIndex].items[0].value} / {250} Kcal
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            (섭취량 / 설정량)
          </Typography>
          <Typography variant="body1" component="p">
            {avg - 100 > 0
              ? `${avg - 100}%만큼 더 먹었어요`
              : avg - 100 === 0
              ? "완벽해요"
              : `${100 - avg}% 만큼 덜 먹었어요`}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
export default Chart;
