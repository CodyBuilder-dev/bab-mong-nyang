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
    marginTop: "30px",
    marginBottom: "30px"
  },
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    if (!isLoggedIn()) {
      alert('로그인이 필요한 서비스입니다.')
      history.push("/login");
    }
  }, [window.onpopstate]);
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
