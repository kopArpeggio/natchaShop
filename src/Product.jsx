import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import { useLocation } from "react-router-dom";
import { getProductById } from "./apis/productApi";
import { getImageUrl } from "./utils/utils";

function Product() {
  const [alignment, setAlignment] = React.useState("web");
  const [size, setSize] = useState("");
  const location = useLocation();

  const [product, setProduct] = useState("");
  const [productSize, setProductSize] = useState("");
  const productId = location?.state && location?.state?.productId;

  const formattedPrice = new Intl.NumberFormat("en-US").format(product?.price);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [totalPrice, setTotalPrice] = useState(
    parseFloat(localStorage.getItem("totalPrice")) || 0
  );

  useEffect(() => {
    getProductById(productId).then((res) => {
      setProduct(res?.data);
      console.log(res.data);
      console.log(res.size);
      setProductSize(res.size);
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice);
  }, [cartItems, totalPrice]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setSize(event?.target?.value);
    console.log(size);
  };

  const addItemToCart = (item) => {
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.name === item.name && cartItem.size === item.size
    );

    if (itemIndex !== -1) {
      // If the item already exists with the same name and size, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity += 1;

      setCartItems(updatedCartItems);
      setTotalPrice(totalPrice + item.price);
    } else {
      // If the item doesn't exist with the same name and size, add it to the cart
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      setTotalPrice(totalPrice + item.price);
    }
  };

  const removeItemFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    const removedItem = updatedCartItems.splice(index, 1)[0];
    setCartItems(updatedCartItems);
    setTotalPrice(totalPrice - removedItem.price);
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
                width: 650,
                maxHeight: { xs: 615, md: 420 },
                maxWidth: { xs: 650, md: 420 },
              }}
              alt="Item."
              src={
                product?.picture
                  ? getImageUrl(product?.picture)
                  : "/assets/img/no-image.png"
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>เสื้อยืด</Typography>
            <Typography sx={{ fontSize: "3vh" }}>เสื้อยืดแขนสั้น</Typography>
            <Typography sx={{ fontSize: "4vh" }}>{product?.name}</Typography>
            <Typography
              sx={{
                fontWeight: "900",
                fontSize: "3vh",
                mt: 2,
                mb: 2,
                WebkitTextStroke: "2px black",
              }}
            >
              THB {formattedPrice}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>ขนาดไซต์</Typography>

            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton
                value="s"
                sx={{
                  marginRight: 2,
                  width: "6vh",
                  outlineWidth: "1px",
                  outlineColor: "black",
                  outlineStyle: "solid",
                  color: "black",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "black",
                  },
                }}
              >
                S
              </ToggleButton>
              <ToggleButton
                value="m"
                sx={{
                  marginRight: 2,
                  width: "6vh",
                  outlineWidth: "1px",
                  outlineColor: "black",
                  outlineStyle: "solid",
                  color: "black",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "black",
                  },
                }}
              >
                M
              </ToggleButton>
              <ToggleButton
                value="l"
                sx={{
                  marginRight: 2,
                  width: "6vh",
                  outlineWidth: "1px",
                  outlineColor: "black",
                  outlineStyle: "solid",
                  color: "black",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "black",
                  },
                }}
              >
                L
              </ToggleButton>
              <ToggleButton
                sx={{
                  marginRight: 2,
                  width: "6vh",
                  outlineWidth: "1px",
                  outlineColor: "black",
                  outlineStyle: "solid",
                  color: "black",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "black",
                  },
                }}
                value="x"
              >
                X
              </ToggleButton>
              <ToggleButton
                sx={{
                  marginRight: 2,
                  width: "6vh",
                  outlineWidth: "1px",
                  outlineColor: "black",
                  outlineStyle: "solid",
                  color: "black",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "black",
                  },
                }}
                value="xl"
              >
                XL
              </ToggleButton>
              <ToggleButton
                sx={{
                  marginRight: 2,
                  width: "6vh",
                  outlineWidth: "1px",
                  outlineColor: "black",
                  outlineStyle: "solid",
                  color: "black",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "black",
                  },
                }}
                value="freeSize"
              >
                FS
              </ToggleButton>
            </ToggleButtonGroup>

            {size == "" ? (
              <Typography sx={{ color: "red", mt: 1 }}>
                **โปรดเลือกไซต์
              </Typography>
            ) : (
              ""
            )}
            <Box>
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  fontSize: "2vh",
                  padding: "10px 40px",
                  color: "black",
                  borderColor: "black",
                }}
              >
                จำนวนสินค้า :{" "}
                {size === "s"
                  ? productSize[0]?.stock
                  : size === "m"
                  ? productSize[1]?.stock
                  : size === "l"
                  ? productSize[2]?.stock
                  : size === "x"
                  ? productSize[3]?.stock
                  : size === "xl"
                  ? productSize[4]?.stock
                  : size === "freeSize"
                  ? productSize[5]?.stock
                  : 0}
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="success"
                disabled={size == 0}
                onClick={() =>
                  addItemToCart({
                    product_id: product?.id,
                    name: product?.name,
                    price: Math.floor(product?.price),
                    size: size,
                    size_id: product?.Size?.id,
                  })
                }
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
