import React, { Fragment, useEffect } from "react";
import Header from "./Header";
import { CssBaseline, Container, makeStyles } from "@material-ui/core";
import { useStore } from "../custom-hooks/custom-hooks";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  content: {
    margin: "0 auto"
  },
  container: {
    marginTop: "100px",
    marginBottom: "30px"
  }
}));

const Layout = props => {
  const classes = useStyles();

  const { store } = useStore();
  const history = useHistory();
  const isLoggedIn = () => {
    if (
      ["/", "/login", "/join", ""].indexOf(history.location.pathname) ===
        -1 &&
      (store.u_No === "" || store.u_No === undefined)
    ) {
      return false;
    } else return true;
  };
  useEffect(() => {
    console.log(history)
    if (!isLoggedIn()) {
      history.index = -1;
      history.push("/login");
    }
  }, [store.u_No]);
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Container className={classes.content} maxWidth="xl">
        <div className={classes.container}>{props.children}</div>
      </Container>
    </Fragment>
  );
};

export default Layout;
