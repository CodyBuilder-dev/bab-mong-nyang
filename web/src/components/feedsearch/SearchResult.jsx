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
  media:{
    width : "50px",
    height : "70px"
  }
}));


const SearchResult = props => {
  const classes = useStyles();
  const history = useHistory();
  const goFeedInfo = f_id => {
    history.push(`/feedinfo/${f_id}`)
  }
  return (
    <Box className={classes.tab}>
      <List className={classes.root}>
        {props.data.map(data => (
          <ListItem key={`feedImage${data.id}`} button onClick={() => goFeedInfo(data.id)}>
            <ListItemAvatar>
              <CardMedia className = {classes.media} image={data.img} title="Feed Image" />
            </ListItemAvatar>
            <ListItemText primary={data.name} secondary={data.company} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default SearchResult;
