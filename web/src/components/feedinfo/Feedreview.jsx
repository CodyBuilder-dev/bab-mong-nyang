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
  Paper,
  Typography,
  ListItemSecondaryAction
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const useStyles = makeStyles(theme => ({
  page: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    //justifyContent : "center"
  },
  ratingBox: {
    textTransform: "none",
    backgroundColor: "#FFCC99",
    display: "inline",
    fontSize: "30px",
    padding: "0 3px",
    color: "#FFFFFF"
  },
  buttonBox: {
    justifyContent: "space-around",
    display: "flex",
    marginTop: "10px"
  },
  buttons: {
    width: "45%"
  },
  inlinecomp: {
    display: "flex-inline"
  },
  recommend: {
    color: "#44d62c"
  },
  nonrecommend: {
    color: "#f93822"
  }
}));
const dummy = [
  {
    r_No: 1,
    u_Name: "바나맘",
    d_Species: "치와와",
    r_Rank: 4.5,
    r_Date: "2020-01-01",
    r_Positive: "맛있다.",
    r_Negative: "강아지가 맛없어 한다.",
    r_Recommend: 1
  },
  {
    r_No: 2,
    u_Name: "차차",
    d_Species: "허스키",
    r_Rank: 2.0,
    r_Date: "2020-01-04",
    r_Positive: "물기가 없다.",
    r_Negative: "물기가 없다.",
    r_Recommend: 4
  },
  {
    r_No: 3,
    u_Name: "파파",
    d_Species: "차우차우",
    r_Rank: 4.0,
    r_Date: "2020-01-05",
    r_Positive: "강아지가 멍멍한다",
    r_Negative: "강아지가 멍멍한다",
    r_Recommend: 3,
    comments: {
      c_No: 1,
      c_Comment: "아아",
      u_No: "김엄마"
    }
  }
];
const Feedreview = props => {
  const classes = useStyles();
  const value = 4.6;
  return (
    <div className={classes.page}>
      <Box>
        <Box marginBottom="10px">
          <Paper className={classes.ratingBox} square={false}>
            4.3
          </Paper>
          <Rating name="readonly" value={value} readOnly precision={0.5} />
        </Box>
        <Button variant="outlined" fullWidth>
          작성하기
        </Button>
      </Box>
      <Box justifyContent="flex-end" marginTop="10px">
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <Button>베스트순</Button>
          <Button>최신순</Button>
        </ButtonGroup>
      </Box>
      {dummy.map((data, i) => {
        return (
          <Box
            paddingTop={1}
            borderTop={1}
            marginTop={1}
            width="100%"
            maxWidth="375px"
          >
            <Box>
              <List dense>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircle />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={data.u_Name}
                    secondary={data.d_Species}
                  />
                  <ListItemSecondaryAction>
                    <Box
                      display="flex"
                      width="130px"
                      alignItems = "center"
                      justifyContent = "flex-end"
                    >
                      <Typography variant="caption">{data.r_Date}</Typography>
                      <Box m = {1}display = {data.u_Name === "바나맘" ? "flex" : "none"}>
                        <EditIcon fontSize="small" />
                        <DeleteIcon fontSize="small" />
                      </Box>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <Typography
                      className={
                        data.r_Rank > 2.5
                          ? classes.recommend
                          : classes.nonrecommend
                      }
                      variant="caption"
                    >
                      {data.r_Rank > 2.5 ? "추천" : "비추"}{" "}
                    </Typography>
                    &nbsp;
                    <Rating
                      name="readonly"
                      value={data.r_Rank}
                      readOnly
                      precision={0.5}
                      size="small"
                    />
                  </Box>
                </Box>
              </List>
            </Box>
            <Box>
              <Typography variant="body2">
                <Typography
                  variant="body2"
                  display="inline"
                  className={classes.recommend}
                >
                  장점
                </Typography>{" "}
                {data.r_Positive}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Typography
                  variant="body2"
                  display="inline"
                  className={classes.nonrecommend}
                >
                  단점
                </Typography>{" "}
                {data.r_Negative}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="caption" color="textSecondary">
                {data.r_Recommend}명이 도움 받았습니다
              </Typography>
              <Button color="secondary">신고</Button>
            </Box>
            <Box className={classes.buttonBox}>
              <Button className={classes.buttons} variant="outlined">
                <ThumbUpAltIcon fontSize = "small" color = "primary"/>
                도움이 돼요({data.r_Recommend})
              </Button>
              <Button className={classes.buttons} variant="outlined">
                댓글
              </Button>
            </Box>
          </Box>
        );
      })}
    </div>
  );
};

export default Feedreview;
