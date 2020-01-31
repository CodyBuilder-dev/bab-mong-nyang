import React, { useState, useEffect, useCallback } from "react";
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Badge,
  Popover
} from "@material-ui/core";
import { useNotes } from "../custom-hooks/custom-hooks";

import { ArrowBack } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DrawerList from "./header/DrawerList";
import NotificationList from "./header/NotificationList";
import UserPopOver from "./header/UserPopOver";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { submitForm } from "../../modules/store"
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
  }
}));
// ========================================================================
let noteItems = [
  { value: "사료통이 비었어요.", isRead: false },
  { value: "야옹이가 밥을 다먹었어요!", isRead: false },
  { value: "오늘은 야옹이가 밥을 10g 남겼어요.", isRead: false },
  { value: "안녕하세요!", isRead: false }
];
// Test data=============================================================
const Header = props => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const notePopOver = Boolean(anchorEl);
  const notePopId = notePopOver ? "popover" : undefined;
  const dispatch = useDispatch();
  const refresh = useCallback(() => dispatch(submitForm('')), [dispatch]);
  const userPopOver = Boolean(userAnchorEl);
  const userPopId = userPopOver ? "popover" : undefined;

  const {
    notes,
    addNote,
    checkNote,
    checkAll,
    removeNote,
    removeAll
  } = useNotes(noteItems);
  const unRead = notes => {
    let cnt = 0;
    for (const note of notes) {
      if (!note.isRead) cnt++;
    }
    return cnt;
  };
  useEffect(() => {
    window.onpopstate = e => {
      setOpen(false);
      handleClose()
      handleClose2(null);
    };
  });
  const onClickDrawerOpenHandler = () => {
    setOpen(true);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = event => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setUserAnchorEl(null);
  };
  const onClickBackHandler = () => {
    refresh();
    history.goBack();
  };
  if (
    ["/", "/home", "/login", ""].indexOf(history.location.pathname) >
    -1
  ) {
    return <></>;
  }
  const appBarEl = () => {
    
    if (history.location.pathname === "/main") {
      return (
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

          <Typography variant="h6" className={classes.title}>
            IoT Servent System
          </Typography>

          <IconButton
            color="inherit"
            aria-describedby={notePopId}
            variant="contained"
            onClick={handleClick}
          >
            <Badge badgeContent={unRead(notes)} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={userPopId}
            aria-haspopup="true"
            onClick={handleProfileClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Popover
          id={notePopId}
          open={notePopOver}
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
          <NotificationList
            notes={notes}
            onItemCheck={idx => checkNote(idx)}
            onItemRemove={idx => removeNote(idx)}
            onCheckAll={() => checkAll()}
            onRemoveAll={() => removeAll()}
          />
        </Popover>
        <Popover
          id={userPopId}
          open={userPopOver}
          anchorEl={userAnchorEl}
          onClose={handleClose2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <UserPopOver setAnchorEl={setUserAnchorEl} />
        </Popover>
        </Toolbar>
      );
    }
    return (
      <Toolbar>
        <IconButton
          color="default"
          aria-label="open drawer"
          onClick={onClickBackHandler}
          edge="start"
          className={classes.menuButton}
        >
          <ArrowBack />
        </IconButton>
      </Toolbar>
    );
  };
  return (
    <>
      <AppBar position="fixed" color="default" className={classes.appBar}>
        {appBarEl()}
        <SwipeableDrawer
          anchor={"left"}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <DrawerList setOpen={setOpen} open={open} />
        </SwipeableDrawer>
        
      </AppBar>
    </>
  );
};

export default Header;
