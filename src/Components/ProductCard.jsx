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
import { getImageUrl } from "../utils/utils";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const isAuthorized = localStorage.getItem("token");

  return (
    <div>
      {" "}
      <Link
        to={isAuthorized ? `/product` : `/login`}
        state={{ productId: product?.id }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="409px"
            width={"303px"}
            image={
              product?.picture
                ? getImageUrl(product?.picture)
                : "/assets/img/no-image.png"
            }
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
              {product?.name}
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
              THB {new Intl.NumberFormat("en-US").format(product?.price)}
            </Typography>
          </CardContent>
          {/* <CardActions>
      
      </CardActions> */}
        </Card>
      </Link>
    </div>
  );
}

export default ProductCard;
