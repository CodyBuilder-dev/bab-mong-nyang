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

// ======= Test Data =========================================
const devices = [
  {
    id: "userName-0",
    petName: "댕댕이"
  },
  {
    id: "userName-1",
    petName: "야옹이"
  }
];
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
    marginLeft: '36px'
  }
}));

function DeviceDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="device-dialog"
      open={open}
    >
      <DialogTitle id="device-dialog">기기를 선택하세요</DialogTitle>
      <List>
        {devices.map(device => (
          <ListItem
            button
            onClick={() => handleListItemClick(device)}
            key={device.id}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${device.petName}꺼`} />
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

export default function DeviceSelect() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(devices[0]);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className={classes.deviceSelectForm}>
      <div className={classes.deviceInfoBox}>
        <Typography variant="subtitle1" display={"inline"}>
          {selectedValue.petName}'s 밥그릇
        </Typography>
        <IconButton onClick={handleClickOpen}>
          <ArrowDropDown />
        </IconButton>
      </div>
      <DeviceDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
