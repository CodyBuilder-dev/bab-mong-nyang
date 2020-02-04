import React from "react";
import Rating from "@material-ui/lab/Rating";
import {
  Box,
  Button,
  makeStyles,
  ButtonGroup,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Paper
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles(theme => ({
  page: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  ratingBox : {
    textTransform: 'none',
    backgroundColor: '#FFCC99',
    display : 'inline',
    fontSize : "30px",
    padding : "0 3px",
    color : "#FFFFFF"
  }
}));
const dummy =[
  {
    u_Name : "바나맘",
    d_Species : "치와와",
    r_Rank : 4.5,
    r_Data : "2010-11-01",
    r_Positive : "물기가 없다.",
    r_Negative : "물기가 없다."
  }

]
const Feedreview = props => {
  const classes = useStyles();
  const value = 4.6;
  return (
    <div className={classes.page}>
      <Box>
        <div>
          <Paper  className = {classes.ratingBox} square = {false}>4.3</Paper>
          <Rating name="readonly" value={value} readOnly precision={0.5} />
        </div>
        <Button variant="outlined" fullWidth>
          작성하기
        </Button>
      </Box>
      <Box right="10%" position="relative">
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <Button>베스트순</Button>
          <Button>최신순</Button>
        </ButtonGroup>
      </Box>
      <Box paddingTop={1} borderTop={1} marginTop = {1} fullWidth>
        <Box>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircle />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="바나맘"
                secondary="치와와"
              />
            </ListItem>
            <ListItem>
              <Button>추천</Button>
              <Rating name="readonly" value={value} readOnly precision={0.5} />
              <ListItemText primary = "2010-11-01   |"/>  
              <Button>신고</Button>
            </ListItem>
          </List>
        </Box>
        <Box>
          <p>장점 : 물기가 없다.</p>
          <p>단점 : 물기가 없다.</p>
        </Box>
        <Box>
          <p>0명이 도움 받았습니다</p>
          <Button variant = "outlined">도움이 돼요</Button>
          <Button variant = "outlined">댓글</Button>
        </Box>
      </Box>
    </div>
  );
};

export default Feedreview;
