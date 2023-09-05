import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import CustomButton from "./CustomButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const pages = [
  "ลองออกแบบลายเสื้อ",
  "สิ่งที่ควรรู้",
  "สินค้า",
  "ผลงาน",
  "ขั้นตอนการส่ง",
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: { xs: "black", md: "#4F4F4F" }, padding: "0px 20px 0px 20px" }}
      >
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Screen shirts online
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              // fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#18A0FB", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{ flexGrow: 0, display: { xs: "none", md: "flex" }, gap: 4 }}
          >
            <ShoppingCartOutlinedIcon
              sx={{
                fontSize: "5vh",
                backgroundColor: "white",
                color: "black",
                borderRadius: "1vh",
                cursor: "pointer",
              }}
            />
            <Button
              variant="contained"
              sx={{
                padding: "1vh 4vh",
                color: "#18A0FB",
                backgroundColor: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#c2c2c2",
                },
              }}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              sx={{
                padding: "1vh 4vh",
                backgroundColor: "##18A0FB",
               
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
