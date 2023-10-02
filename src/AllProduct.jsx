import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ProductCard from "./Components/ProductCard";
import { Link } from "react-scroll";
import { SearchProduct, getAllProduct } from "./apis/productApi";
import { useLocation, useSearchParams } from "react-router-dom";

function AllProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);

  const params = new URLSearchParams(window.location.pathname);

  console.log("Search parameter from URL:", params?.get("shop"));

  useEffect(() => {
    if (!product) {
      SearchProduct().then((res) => {
        setProduct(res?.data);
      });
    } else {
      getAllProduct().then((res) => {
        setProduct(res?.data);
      });
    }
  }, []);

  var itemsPerPage = 8;

  const totalPages = Math.ceil(product?.length / itemsPerPage);

  return (
    <div>
      <Container sx={{ maxWidth: "90%" }} maxWidth={false}>
        <Typography>เสื้อยืด(แขนสั้น)</Typography>
        <Grid container spacing={2}>
          {product
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <Grid item key={index} xs={3}>
                <ProductCard product={item} />
              </Grid>
            ))}
        </Grid>
        <div
          style={{ justifyContent: "center", display: "flex", marginTop: 50 }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setCurrentPage(currentPage - 1);
              window.scrollTo(0, 0);
            }}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setCurrentPage(currentPage + 1);
              window.scrollTo(0, 0);
            }}
            disabled={currentPage === totalPages}
          >
            หน้าถัดไป
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default AllProduct;
