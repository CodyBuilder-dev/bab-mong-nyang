import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import { useFetchData, useStore } from "../custom-hooks/custom-hooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// ======= Test Data =========================================
// const devices = [
//   {
//     d_No: "userName-0",
//     d_Name: "댕댕이"
//   },
//   {
//     d_No: "userName-1",
//     d_Name: "야옹이"
//   }
// ];
// ===========================================================
const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  deviceSelectForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  deviceInfoBox: {
    display: "flex",
    alignItems: "center",
    marginLeft: "36px"
  },
  dialogTitle: {
    padding: "10px 24px 0"
  }
}));
const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
      }
    }
  }
});
function DeviceDialog(props) {
  const classes = useStyles();
  const { onClose, open, devices, selectedValue } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="device-dialog" open={open}>
      <DialogTitle id="device-dialog" className={classes.dialogTitle}>
        <Typography>기기를 선택하세요</Typography>
      </DialogTitle>
      <List>
        {devices.map(device => (
          <ListItem
            button
            onClick={() => handleListItemClick(device)}
            key={device.d_No}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${device.d_Name}꺼`} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

DeviceDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

const DeviceSelect = props => {
  const classes = useStyles();
  const { store, onChangeStore } = useStore();
  const { input, isLoading } = useFetchData("/Join/main/", "user");
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({});
  useEffect(() => {
    setSelectedValue(
      input.device.filter(device => device.d_No === store.u_Last)[0]
    );
  }, [input]);
  //input.device === undefined ? {} : input.device.filter(device=>device.d_No === state.u_Last)[0]
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
    onChangeStore(value, "select", "/Join/main");
  };
  //console.log(input);
  return (
    <div className={classes.deviceSelectForm}>
      {isLoading ? (
        <div>
          <Link to="/regist">등록</Link>
        </div>
      ) : (
        <>
          <div className={classes.deviceInfoBox}>
            <Typography variant="subtitle1" display={"inline"}>
              {selectedValue === undefined ? "..." : selectedValue.d_Name}'s
              밥그릇
            </Typography>
            <IconButton onClick={handleClickOpen}>
              <ArrowDropDown />
            </IconButton>
          </div>
          <DeviceDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            devices={input.device}
          />
        </>
      )}
    </div>
  );
};
export default DeviceSelect;
