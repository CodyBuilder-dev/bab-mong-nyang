import React from "react";
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
import { useHistory } from "react-router";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  drawerList: {
    width: 250,
    backgroundColor: theme.palette.background.paper
  }
}));

const DrawerList = ({ setOpen, open }) => {
  const classes = useStyles();
  const history = useHistory();
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
        <ListItem
          button
          onClick={() => {
            setOpen(false);
            history.push("/main");
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="홈" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setOpen(false);
            history.push("/set");
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="설정" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setOpen(false);
            history.push("/info");
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="내 정보" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setOpen(false);
            history.push("/device");
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="기기 목록" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setOpen(false);
            history.push("/chart");
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="차트" />
        </ListItem>
      </Container>
    </List>
  );
};

export default DrawerList;
