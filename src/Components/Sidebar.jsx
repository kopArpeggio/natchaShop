import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import React from "react";

function Sidebar({ setComponent }) {
  return (
    <div>
      <Toolbar />
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "800",
          fontSize: 24,
          mb: 4,
        }}
        disablePadding
      >
        สมาชิก
      </ListItem>
      <Divider />
      <List>
        <ListItem
          sx={{ display: "flex", justifyContent: "center", fontSize: 19 }}
          disablePadding
        >
          สมาชิก
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setComponent(false);
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"บัญชี"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setComponent("order");
            }}
          >
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary={"รายการสั่งซื้อ"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          sx={{ display: "flex", justifyContent: "center", fontSize: 19 }}
          disablePadding
        >
          การตั้งค่าบัญชี
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setComponent(true);
            }}
          >
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary={"แก้ไขบัญชี"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              localStorage.setItem("token", "");
              window.location.reload();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"ออกจากระบบ"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
