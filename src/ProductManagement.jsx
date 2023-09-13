import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { createProduct } from "./apis/productApi";

function ProductManagement() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  return (
    <div>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <Box>
              <Typography sx={{ fontSize: "3vh" }}>เพิ่มสินค้า</Typography>

              <TextField
                required
                onChange={(e) => {
                  setProduct({ ...product, name: e?.target?.value });
                }}
                id="standard-basic"
                label="ชื่อสินค้า"
                variant="standard"
                sx={{ margin: "5px" }}
              />
            </Box>
            <Box>
              <TextField
                onChange={(e) => {
                  setProduct({ ...product, price: e?.target?.value });
                }}
                required
                sx={{ margin: "5px" }}
                id="standard-basic"
                label="ราคา"
                variant="standard"
              />
            </Box>
            <Box>
              <TextField
                onChange={(e) => {
                  setProduct({ ...product, quantity: e?.target?.value });
                }}
                required
                sx={{ margin: "5px" }}
                id="standard-basic"
                label="จำนวนสินค้า"
                variant="standard"
              />
            </Box>
            <Box>
              <Button
                disabled
                variant="contained"
                component="label"
                sx={{ margin: "5px", mt: 2 }}
              >
                ภาพสินค้า
                <input type="file" hidden />
              </Button>
            </Box>
            <Button
              onClick={() => {
                createProduct(product);
              }}
              type="submit"
              sx={{
                mt: 5,
                fontSize: "2vh",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "white", color: "black" },
              }}
              variant="contained"
            >
              เพิ่มสินค้า
            </Button>
          </FormControl>
        </Box>
      </Container>
    </div>
  );
}

export default ProductManagement;
