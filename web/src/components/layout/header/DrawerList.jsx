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
import { useFetchData } from "../../custom-hooks/custom-hooks";
import {useSelector} from "react-redux";
import { useEffect } from "react";
const useStyles = makeStyles(theme => ({
  drawerList: {
    width: 250,
    backgroundColor: theme.palette.background.paper
  }
}));

const DrawerList = ({ setOpen, open }) => {
  const classes = useStyles();
  const history = useHistory();
  const store = useSelector(state => state.store, []);
  const {input, isLoading} = useFetchData("/device/","device_select") 
  if(isLoading){
    return <div>.....Loading</div>
  }
  return (
    <List className={classes.drawerList}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircle />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={input.d_Name} secondary={input.d_Age+"살"} />
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
