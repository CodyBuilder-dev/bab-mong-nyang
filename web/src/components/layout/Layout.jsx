import React, { Fragment, useContext } from "react";
//import Header from "./Header";
//import Footer from "./Footer";

import { CssBaseline, Container, makeStyles } from "@material-ui/core";
//import { CommonContext } from "../context/CommonContext";

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign : 'center',
  },
  container: { 
  },
  text : {
    fontSize : 25
  }
}));

const Layout = props => {
  const classes = useStyles();
  //const {} = useContext(CommonContext);

  return (
    <Fragment>
      <CssBaseline />
      
      <Container className={classes.content} maxWidth="xl">
        <p className={classes.text}>{props.children}</p>
      </Container>
      
    </Fragment>
  );
};

export default Layout;
