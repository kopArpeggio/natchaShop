import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";

const pages = ["NPSHOP"];
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
    navigate("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: {
            xs: "white",
            md: "white",
            marginBottom: "5vh",
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            height: "100px",
            display: "flex", // Use flexbox
            alignItems: "center", // Vertically center the content
            justifyContent: "space-around", // Horizontally distribute space
          }}
        >
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}

          <Box
            sx={{
              flexGrow: { md: 0, xs: 1 },
              display: { xs: "flex", md: "flex" },
              justifyContent: "center",
              verticalAlign: "middle",
            }}
          >
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                display: "flex",
                fontFamily: "Prompt, sans-serif",
                letterSpacing: ".1rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              เสื้อยืด
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: "center",
              verticalAlign: "middle",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  display: "block",
                  padding: "25px 58px 25px 58px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              gap: 3,
              flexGrow: 0,
              display: { xs: "flex", md: "flex" },
            }}
          >
            <SearchIcon
              sx={{
                fontSize: "5vh",
                color: "black",
                cursor: "pointer",
              }}
            />
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: "5vh",
                backgroundColor: "white",
                color: "black",
                borderRadius: "1vh",
                cursor: "pointer",
              }}
            />
            <PersonOutlineOutlinedIcon
              sx={{
                fontSize: "5vh",
                backgroundColor: "white",
                color: "black",
                borderRadius: "1vh",
                cursor: "pointer",
              }}
            />
          </Box>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
