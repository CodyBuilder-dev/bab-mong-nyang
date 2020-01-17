import React, { useState } from "react";

import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const useStyles = makeStyles(theme => ({
  noteList: {
    height: "100%"
  },
  noteListItem: {
    height: 30
  },
  listItemText: {
    fontSize: "0.7rem"
  }
}));

const UserPopOver = props => {
  const classes = useStyles();
  const items = [
    {
      key: 1,
      value: "회원정보",
      icon: <PermIdentityIcon fontSize="small" />
    },
    {
      key: 2,
      value: "로그아웃",
      icon: <PowerSettingsNewIcon fontSize="small" />
    }
  ]; // Test data

  return (
    <List className={classes.noteList}>
      {items.map(item => (
        <ListItem button key={`${item.key}`} className={classes.noteListItem}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={`${item.value}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserPopOver;
