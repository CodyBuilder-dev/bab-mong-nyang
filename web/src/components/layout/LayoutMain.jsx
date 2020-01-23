import React, { Fragment } from "react";
import Header from "./Header";
import { CssBaseline, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  content: {
    margin: "0 auto"
  },
  container: {
    marginTop: "100px",
    marginBottom: "30px"
  }
}));

const Layout = (props) => {
  const classes = useStyles();
  console.log(props);
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
