import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import SellIcon from "@mui/icons-material/Sell";
import SendIcon from "@mui/icons-material/Send";
const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog slotProps={{
        backdrop: {
          sx: {
            //Your style here....
            backgroundColor: 'transparent',
          },
        },
      }} sx={{position:'absolute'}} onClose={handleClose} open={open}>
      <List className="1234567">
        <ListItem disablePadding>
          <ListItemButton onClick={handleListItemClick}>
            <ListItemIcon>
              <SendIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <Typography
              variant="caption"
              sx={{ color: "black", fontSize: "20px", fontWeight: "600" }}
            >
              Transfer
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleListItemClick}>
            <ListItemIcon>
              <SellIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <Typography
              variant="caption"
              sx={{ color: "black", fontSize: "20px", fontWeight: "600" }}
            >
              Sell
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        endIcon={<MoreVertIcon />}
        onClick={handleClickOpen}
      >
        Open simple dialog
      </Button>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
    </div>
  );
}
