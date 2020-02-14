import React from "react";
import {
  makeStyles,
  Typography,
  Box,
  Grid,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router";
import { useStore } from "../custom-hooks/custom-hooks";
import { useState } from "react";
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  tab: {
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    maxWidth: "500px"
  },
  media: {
    width: "50px",
    height: "70px"
  }
}));

const SearchResult = props => {
  const classes = useStyles();
  const history = useHistory();
  const { store } = useStore();
  const goFeedInfo = f_id => {
    history.push(`/feedinfo/${f_id}`);
  };
  return (
    <Box className={classes.tab}>
      <List className={classes.root}>
        {console.log(store.options)}
        {false ? <></> : props.data.map(data => (
          <ListItem
            key={`feedImage${data.f_No}`}
            button
            onClick={() => goFeedInfo(data.f_No)}
          >
            <ListItemAvatar>
              <CardMedia
                className={classes.media}
                image={null}
                title="Feed Image"
              />
            </ListItemAvatar>
            <ListItemText
              primary={data.f_Name}
              secondary={data.f_Manufacturer}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default SearchResult;
