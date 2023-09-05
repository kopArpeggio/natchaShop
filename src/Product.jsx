import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function Product() {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <Container>
        <Box
          sx={{
            mt: 5,
            mb: 5,
            justifyContent: "center",
            textAlign: "center",
            color: "white",
          }}
        >
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              fontSize: "3vh",
              fontStyle: "italic",
              fontWeight: "bold",
              padding: "20px 50px",
            }}
          >
            Natcha
          </button>
        </Box>
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
            <Typography>shirt</Typography>
            <h2>name#666</h2>
            <Typography>185</Typography>
            <Typography>Select size</Typography>

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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Product;
