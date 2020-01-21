import React, { useState, useContext } from "react";

import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  noteList: {
    width: 300,
    maxHeight: 400
  }
}));

const NotificationList = props => {
  const classes = useStyles();
  const noteItems = [
    { key: 1, value: "사료통이 비었어요.", isRead: false },
    { key: 2, value: "야옹이가 밥을 다먹었어요!", isRead: false },
    { key: 3, value: "오늘은 야옹이가 밥을 10g 남겼어요.", isRead: false },
    { key: 4, value: "안녕하세요!", isRead: true }
  ]; // Test data
  return (
    <List className={classes.noteList}>
      <ListSubheader>{`알림`}</ListSubheader>
      <Divider />
      {noteItems.map(item => (
        <ListItem button key={`${item.key}`}>
          <ListItemText primary={`${item.value}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationList;
