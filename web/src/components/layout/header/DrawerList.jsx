import React, { useState, useContext } from "react";

import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Divider,
  Container
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  drawerList: {
    width: 250,
    backgroundColor: theme.palette.background.paper
  }
}));

const DrawerList = props => {
  const classes = useStyles();

  return (
    <List className={classes.drawerList}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="야옹이" secondary="2살, ♂" />
        </ListItem>
        <Divider />
        <Container>
          <ListItem button component = 'a' href ='/main'>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="홈" />
          </ListItem>
          <Divider />
          <ListItem button component = 'a' href ="/set">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="설정" />
          </ListItem>
          <Divider />
          <ListItem button key="userInfo">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="내 정보" />
          </ListItem>
          <Divider />
          <ListItem button key="userInfo">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="내 정보" />
          </ListItem>
          <Divider />
          <ListItem button key="userInfo">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="내 정보" />
          </ListItem>
          <Divider />
          <ListItem button key="userInfo">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="내 정보" />
          </ListItem>
        </Container>
      </List>
  );
};

export default DrawerList;
