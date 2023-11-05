import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import ViewProfile from "./Components/Profile/ViewProfile";
import { userData } from "./apis/rootApi";
import EditProfile from "./Components/Profile/EditProfile";
import OrderViewUser from "./OrderViewUser";

const drawerWidth = 240;

export default function ProfileManagement(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [member, setMember] = useState("");
  const [component, setComponent] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getUser = () => {
    userData().then((res) => {
      setMember(res?.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Sidebar setComponent={setComponent} />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <Sidebar setComponent={setComponent} />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {component == true ? (
            <EditProfile member={member} getUser={getUser} />
          ) : component == false ? (
            <ViewProfile member={member} getUser={getUser} />
          ) : (
            <OrderViewUser member={member} />
          )}
        </Box>
      </Box>
    </div>
  );
}
