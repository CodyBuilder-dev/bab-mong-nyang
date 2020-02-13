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
import HomeIcon from '@material-ui/icons/Home';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import StorageIcon from '@material-ui/icons/Storage';
import AccountCircle from "@material-ui/icons/AccountCircle";
import FeedIcon from "../../../assets/icons/feeddish.svg";
import { useFetchData } from "../../custom-hooks/custom-hooks";
const useStyles = makeStyles(theme => ({
  drawerList: {
    width: 250,
    backgroundColor: theme.palette.background.paper
  },
  icons: {
    height: "24px"
  },
  iconContainer: {
    textAlign: "center"
  }
}));

const DrawerList = ({ setOpen, open }) => {
  const classes = useStyles();
  const history = useHistory();
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
        {
          input.device === undefined ? (
            <ListItemText primary="기기를 등록해주세요" />    
          ) : (
            <ListItemText primary={input.device.d_Name} secondary={input.device.d_Age+"살"} />
          )
        }
        
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
            <HomeIcon />
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
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary="급여 설정" />
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
            <img className={classes.icons} src={FeedIcon} alt="feedIcon" />
          </ListItemIcon>
          <ListItemText primary="기기 목록" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setOpen(false);
            history.push("/record");
          }}
        >
          <ListItemIcon>
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText primary="급식 기록" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setOpen(false);
            history.push("/feedsearch");
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="사료 정보" />
        </ListItem>
      </Container>
    </List>
  );
};

export default DrawerList;
