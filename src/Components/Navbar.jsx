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
import { useEffect } from "react";
import { userData } from "../apis/rootApi";
import SearchModal from "./Modal/SearchModal";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { FailALert } from "./Alert";

const pages = ["NPSHOP"];

function Navbar() {
  const isAuthorized = localStorage.getItem("token");
  const [role, setRole] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    navigate("/home");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (isAuthorized) {
      userData().then((res) => {
        setRole(res?.data?.role);
      });
    }
  }, []);

  const exit = () => {
    navigate("/");
    FailALert("โปรดเข้าสู่ระบบก่อน");
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

          <SearchModal setModalOpen={setOpenModal} modalOpen={openModal} />
          <Box
            sx={{
              whiteSpace: "nowrap",
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
              href="/shop"
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
            {role === "admin" ? (
              <>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/manage-product"
                  sx={{
                    ml: 4,
                    display: "flex",
                    fontFamily: "Prompt, sans-serif",
                    letterSpacing: ".1rem",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  จัดการสินค้า
                </Typography>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/payment"
                  sx={{
                    ml: 4,
                    display: "flex",
                    fontFamily: "Prompt, sans-serif",
                    letterSpacing: ".1rem",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  ออเดอร์
                </Typography>
              </>
            ) : (
              ""
            )}
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
                  fontSize: "2vh",
                  fontWeight: "bold",
                  backgroundColor: "black",
                  display: "block",
                  padding: "25px 58px 25px 58px",
                  "&:hover": {
                    color: "black",
                    border: "1px solid black",
                  },
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
              onClick={() => {
                setOpenModal(true);
              }}
              sx={{
                fontSize: "5vh",
                color: "black",
                cursor: "pointer",
              }}
            />
            <ShoppingBagOutlinedIcon
              onClick={() => {
                !isAuthorized ? exit() : navigate("/cart");
              }}
              sx={{
                fontSize: "5vh",
                backgroundColor: "white",
                color: "black",
                borderRadius: "1vh",
                cursor: "pointer",
              }}
            />

            {isAuthorized ? (
              <AllInboxIcon
                onClick={() => {
                  !isAuthorized ? navigate("/") : navigate("/tracking");
                }}
                sx={{
                  fontSize: "5vh",
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "1vh",
                  cursor: "pointer",
                }}
              />
            ) : (
              ""
            )}

            <PersonOutlineOutlinedIcon
              // onClick={() => navigate("/profile")}
              onClick={() => {
                !isAuthorized ? navigate("/") : navigate("/profile");
              }}
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
