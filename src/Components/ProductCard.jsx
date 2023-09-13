import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  CardContent,
  Card,
  CardMedia,
} from "@mui/material";

function ProductCard({ productName, price }) {
  return (
    <div>
      {" "}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="409px"
          width={"303px"}
          image="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1615&q=80"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            เสื้อยืดแขนสั้น
          </Typography>
          <Typography
            variant="body2"
            color="black"
            sx={{ textAlign: "left", fontSize: 18 }}
          >
            {productName}
          </Typography>
          <Typography
            variant="body2"
            color="black"
            sx={{
              textAlign: "left",
              fontWeight: "900",
              mt: 2,
              fontSize: 18,
            }}
          >
            THB {price}
          </Typography>
        </CardContent>
        {/* <CardActions>
      
      </CardActions> */}
      </Card>
    </div>
  );
}

export default ProductCard;
