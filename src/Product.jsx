import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";

function Product() {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              component="img"
              sx={{
                height: 615,
                width: 632,
                maxHeight: { xs: 615, md: 400 },
                maxWidth: { xs: 632, md: 300 },
              }}
              alt="Item."
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>เสื้อยืด</Typography>
            <Typography sx={{ fontSize: "4vh" }}>เสื้อยืดแขนสั้น</Typography>
            <Typography sx={{ fontSize: "4vh" }}>Chainsaw Devil</Typography>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "2vh", mt: 2, mb: 2 }}
            >
              THB 185
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>ขนาดไซต์</Typography>

            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="s" sx={{ marginRight: 2 }}>
                S
              </ToggleButton>
              <ToggleButton value="m" sx={{ marginRight: 2 }}>
                M
              </ToggleButton>
              <ToggleButton value="l" sx={{ marginRight: 2 }}>
                L
              </ToggleButton>
              <ToggleButton value="xl">XL</ToggleButton>
            </ToggleButtonGroup>
            <Box>
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  padding: "10px 40px",
                  color: "black",
                  borderColor: "black",
                }}
              >
                จำนวนสินค้า
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="success"
                sx={{
                  backgroundColor: "#2BC660",
                  padding: "20px 0px 20px 0px",
                  fontSize: "2vh",
                  width: "100%",
                  mt: 2,
                  borderColor: "black",
                }}
              >
                เพิ่มลงในตะกล้า
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Divider variant="middle" color="black" sx={{ mt: 5, mb: 5 }} />
      </Container>
    </div>
  );
}

export default Product;
