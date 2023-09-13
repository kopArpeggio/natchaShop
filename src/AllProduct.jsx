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
import { getAllProduct } from "./apis/productApi";

function AllProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getAllProduct().then((res) => {
      setProduct(res?.data);
      console.log(res?.data);
    });
    // console.log(test);
  }, []);

  var itemsPerPage = 8;
  const pages = [
    "Chainsawman",
    3,
    5,
    1,
    4,
    1,
    23,
    45,
    12,
    5,
    "Attack on Titan",
  ];
  const totalPages = Math.ceil(product?.length / itemsPerPage);

  return (
    <div>
      <Container>
        <Typography>เสื้อยืด(แขนสั้น)</Typography>
        <Grid container spacing={2}>
          {product
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <Grid item key={index} xs={3}>
                <ProductCard productName={item?.name} price={item?.price} />
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
            Previous Page
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setCurrentPage(currentPage + 1);
              window.scrollTo(0, 0);
            }}
            disabled={currentPage === totalPages}
          >
            Next Page
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default AllProduct;
