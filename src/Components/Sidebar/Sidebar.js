import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const drawerWidth = 300;

const Sidebar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenDialog(true);
  };

  const handleConfirmLogout = () => {
    setOpenDialog(false);
    localStorage.removeItem("user-info");
    localStorage.removeItem("UserInfo");
    localStorage.setItem("isLoggedIn", "false"); 
    navigate ("/");
};


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginLeft: 5,
            marginTop: 10,
            gap: 5,
          },
        }}
      >
        <List sx={{ paddingTop: "20px", gap: 3 }}>
          <ListItem>
            <img
              src="./Images/instagramwriting.png"
              alt="Instagram Logo"
              style={{ width: "150px" }}
            />
          </ListItem>
          <ListItem button sx={{ marginBottom: "10px" }}>
            <ListItemIcon>
              <img
                src="./Images/home.png"
                alt="Home"
                style={{ width: "24px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button sx={{ marginBottom: "10px" }}>
            <ListItemIcon>
              <img
                src="./Images/search.png"
                alt="Search"
                style={{ width: "24px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button sx={{ marginBottom: "10px" }}>
            <ListItemIcon>
              <img
                src="./Images/explore.png"
                alt="Explore"
                style={{ width: "24px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Explore" />
          </ListItem>
          <ListItem button sx={{ marginBottom: "10px" }}>
            <ListItemIcon>
              <img
                src="./Images/message.png"
                alt="Messages"
                style={{ width: "24px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button sx={{ marginBottom: "10px" }}>
            <ListItemIcon>
              <img
                src="./Images/notification.png"
                alt="Notifications"
                style={{ width: "24px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/myprofile"
            sx={{ marginBottom: "10px" }}
          >
            <ListItemIcon>
              <img
                src="./Images/profileimage.jpg"
                alt="Profile"
                style={{ width: "38px" }}
              />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>

          <ListItem button sx={{ marginBottom: "10px" }} onClick={handleLogout}>
            <ListItemIcon>
              <img
                src="./Images/poweroff.png"
                alt="Profile"
                style={{ width: "25px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Drawer>

      {/* Logout confirmation dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDialog} style={{ color: "#f44336" }}>
            Cancel
          </button>
          <button onClick={handleConfirmLogout} style={{ color: "#2196f3" }}>
            OK
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;