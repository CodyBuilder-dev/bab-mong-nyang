import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom';
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
        {/* <NavLink to={"/main"} style={{ textDecoration: "none" }}> */}
          <ListItem button onClick={() => {
            setOpen(false)
            history.push('/main')
          }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="홈" />
          </ListItem>
        {/* </NavLink> */}
        <Divider />
        {/* <NavLink to={"/set"} style={{ textDecoration: "none" }}> */}
          <ListItem button onClick={() => {
            setOpen(false)
            history.push('/set')
            }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="설정" />
          </ListItem>
        {/* </NavLink> */}
        <Divider />
        <ListItem button onClick={() => {
          setOpen(false)
          history.push('/info')
        }}>
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
