import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
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
import { useHistory, useLocation } from "react-router";
const useStyles = makeStyles(theme => ({
  toolBar: {
    color: "#7dabd0",
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  }
}));
const pathNameMatch = {
  '/set': '설정',
  '/info': '내 정보',
  '/device': '밥그릇 목록',
  '/record': '급식 기록',
  '/feedinfo': '사료 정보',
  '/feedsearch': '사료 검색', 
  '/regist': '기기 등록',
  '/devicemodify': '기기 수정'
}
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
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const notePopOver = Boolean(anchorEl);
  const notePopId = notePopOver ? "popover" : undefined;
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

          <Typography variant="body1" className={classes.title}>
            밥멍냥
          </Typography>

          <IconButton
            color="inherit"
            aria-describedby={notePopId}
            variant="contained"
            onClick={handleClick}
          >
            <Badge badgeContent={unRead(notes)} color="error">
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
        <Typography variant="body1" className={classes.title}>
            {pathNameMatch[location.pathname]}
          </Typography>
      </Toolbar>
    );
  };
  return ( // #23d5c4
    <div style={{position: "sticky", top: "0px", background:"linear-gradient(45deg, #7dabd0 20%, #cfe7ea 100%)", zIndex: 100}}>
      {/* <AppBar position="sticky" color="default" className={classes.appBar}> */}
        {appBarEl()}
        <SwipeableDrawer
          anchor={"left"}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <DrawerList setOpen={setOpen} open={open} />
        </SwipeableDrawer>
        
      {/* </AppBar> */}
    </div>
  );
};

export default Header;
