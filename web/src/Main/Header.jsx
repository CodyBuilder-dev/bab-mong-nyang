import React, { useState, useContext } from "react";
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Badge,
  Popover,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from '@material-ui/icons/Notifications';
import DrawerList from './DrawerList';
import NotificationList from './NotificationList';

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
}));

const Header = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const popOver = Boolean(anchorEl);
  const id = popOver ? "simple-popover" : undefined;

  const onClickDrawerOpenHandler = () => {
    setOpen(true);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
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
          <DrawerList />
        </SwipeableDrawer>
        <Typography variant="h6" className={classes.title}>
          Test
        </Typography>

        <IconButton
          color="inherit"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popover
          id={id}
          open={popOver}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <NotificationList />
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
