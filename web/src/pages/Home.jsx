import React from "react";
import Hellocat from "../hellocat.png";
import { Button, makeStyles } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  home: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));
const Home = props => {
  const classes = useStyle();
  const buttonClick = event => {
    props.history.push("/login");
  };
  return (
    <div className={classes.home}>
      <img src={Hellocat} />
      <p>Hello, This is Auto IoT Servent System</p>
      <Button color="primary" onClick={buttonClick}>
        시작하기
      </Button>
    </div>
  );
};

export default Home;
