import React, { useState, useContext } from "react";
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  // Drawer
  SwipeableDrawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Container,
  ListItemIcon,
  Badge
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(theme => ({
  appBar: {
    // padding: `0 calc(10px + 2vw)`
    color: "default"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  },
  list: {
    width: 250,
    backgroundColor: theme.palette.background.paper
  }
}));

const Header = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onClickDrawerOpenHandler = () => {
    setOpen(true);
  };

  const onClickSignInDialogOpenHandler = () => {
    alert("open signIn Dialog");
  };

  const list = () => (
    <div className={classes.list}>
      <List>
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
    </div>
  );
  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="default"
          aria-label="open drawer"
          onClick={onClickDrawerOpenHandler}
          edge="start"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={"left"}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          {list()}
        </SwipeableDrawer>
        <Typography variant="h6" className={classes.title}>
          Test
        </Typography>
        {/* <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onClickSignInDialogOpenHandler}
          color="inherit"
          size="medium"
        >
          <AccountCircle />
        </IconButton> */}
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
