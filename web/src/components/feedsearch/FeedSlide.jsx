import React from "react";
import {
  makeStyles,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  withStyles
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Slider from "react-slick";
import { useEffect } from "react";
import { useStore } from "../custom-hooks/custom-hooks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const StyledRating = withStyles({
  sizeSmall: {
    fontSize: "0.7rem"
  }
})(Rating);
const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  slider: {
    width: "100%",
    maxWidth: "500px"
  },
  media: {
    height: "70px",
    width: "50px"
  },
  score: {
    height: "100%",
    // width: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
})); // #00b08b

const FeedSlide = ({ input }) => {
  const classes = useStyles();
  console.log(input);
  const [options, setOptions] = React.useState(input);
  const store = useStore();
  const randomArray = (length, max) => [...new Array(length)]
  .map(() => Math.round(Math.random() * max));
  const settings = {
    autoPlay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
  };
  return (
    <Slider {...settings}>
      {input ? (
        randomArray(20, 400).map(num => (
          <div key={`feed_${num}`}>
            {input[num] ? (
              <>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CardMedia
                    className={classes.media}
                    image={`/images/${input[num].f_No}.jpg`}
                    title="Feed Image"
                  />
                  <Typography variant="caption">
                    {input[num].f_Manufacturer}
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>{input[num].f_Name}</strong>
                  </Typography>
                </Box>
                <Box className={classes.score}>
                  <StyledRating
                    name="input[num]-score"
                    // value={input[num].f_Rank}
                    value={4.0}
                    size="small"
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="subtitle2" display="block">
                    {/* {input[num].f_Rank} */}
                    4.0
                  </Typography>
                  <Typography variant="caption" display="block">
                    {/* ({input[num].f_Count}) */}
                    (4)
                  </Typography>
                </Box>
              </>
            ) : (
              "--"
            )}
          </div>
        ))
      ) : (
        <></>
      )}
    </Slider>
  );
};
export default FeedSlide;
