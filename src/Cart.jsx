import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import { getImageUrl } from "./utils/utils";
import PayModal from "./Components/Modal/PayModal";
import { getAllProductById } from "./apis/productApi";
import { FailALert } from "./Components/Alert";

function Cart() {
  const [order, setOrder] = useState({ totalPrice: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState([]);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [totalPrice, setTotalPrice] = useState(
    parseFloat(localStorage.getItem("totalPrice")) || 0
  );

  const isAuthorized = localStorage.getItem("token");

  const removeItemFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    const removedItem = updatedCartItems.splice(index, 1)[0];
    setCartItems(updatedCartItems);
    setTotalPrice(totalPrice - removedItem.price);
  };

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice);

    const productIdsArray = [];

    for (let i = 0; i < cartItems.length; i++) {
      const productId = cartItems[i].product_id;
      productIdsArray.push(productId);
    }

    if (!isAuthorized) {
      navigate("/login");
    }

    getAllProductById(productIdsArray).then((res) => {
      setProduct(res?.data);
    });

    setOrder({
      ...order,
      totalPrice: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      cartItems,
    });
  }, [cartItems, totalPrice]);

  return (
    <div>
      <PayModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        order={order}
        setOrder={setOrder}
      />
      <Container sx={{ maxWidth: "90%" }} maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item md={8}>
            {cartItems ? (
              cartItems.map((item, index) => {
                return (
                  <Box sx={{ mt: 2 }} key={index}>
                    <Grid container spacing={5} sx={{ padding: "20px" }}>
                      <Card
                        sx={{
                          display: "flex",
                          mb: 2,
                          width: "100%",
                          padding: "20px",
                          backgroundColor: "#E1E1E1",
                        }}
                      >
                        <Grid item md={3} sx={{ width: "100%", mr: 2 }}>
                          <CardMedia
                            component="img"
                            height="200px"
                            image={
                              product
                                ? getImageUrl(product[index]?.picture)
                                : "/assets/img/no-image.png"
                            }
                          />
                        </Grid>
                        <Grid item md={9} sx={{}}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box sx={{ fontSize: "18px", fontWeight: "800" }}>
                              {item?.name}
                            </Box>
                            <Box>
                              <CloseIcon
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                  removeItemFromCart(index);
                                }}
                              />
                            </Box>
                          </Box>
                          <Box>รหัสสินค้า : {product[index]?.id}</Box>
                          <Box>ขนาด : {item?.size}</Box>
                          <Box>ราคา : {product[index]?.price}</Box>
                          <Box>จำนวนสินค้า</Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: 2,
                            }}
                          >
                            <Box sx={{ fontSize: "18px", fontWeight: "800" }}>
                              <TextField
                                id="outlined-basic"
                                label=""
                                onChange={(e) => {
                                  setCartItems((prevCartItems) => {
                                    const updatedCartItems = prevCartItems.map(
                                      (item, itemIndex) => {
                                        if (itemIndex === index) {
                                          return {
                                            ...item,
                                            quantity: e?.target?.value || 0, // Use 0 if e?.target?.value is null or undefined
                                          };
                                        }
                                        return item;
                                      }
                                    );
                                    return updatedCartItems;
                                  });
                                }}
                                defaultValue={item?.quantity}
                                variant="outlined"
                                sx={{ width: "25%" }}
                                type="number"
                              />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "end",
                                fontWeight: "700",
                              }}
                            >
                              ยอดรวม : THB{" "}
                              {new Intl.NumberFormat("en-US").format(
                                item?.quantity * item?.price
                              )}
                            </Box>
                          </Box>
                        </Grid>
                      </Card>
                    </Grid>
                  </Box>
                );
              })
            ) : (
              <Typography>ยังไม่มีสินค้าในตะกล้า</Typography>
            )}
          </Grid>
          <Grid item md={4} sx={{}}>
            <Box sx={{ display: "grid", justifyContent: "center" }}>
              <Card sx={{ maxWidth: 345, backgroundColor: "#E1E1E1" }}>
                <CardHeader
                  title={`สรุปคำสั่งซื้อ | ${cartItems?.length}  รายการ`}
                />

                <CardContent sx={{ mt: 12 }}>
                  <Typography sx={{ fontWeight: "800" }}>{`ยอดรวม`}</Typography>
                  <Typography sx={{ fontWeight: "800" }}>
                    THB{" "}
                    {new Intl.NumberFormat("en-US").format(
                      cartItems.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                    )}
                  </Typography>
                </CardContent>
              </Card>
              <Button
                onClick={() => {
                  console.log(order);
                  setModalOpen(true);
                }}
                disabled={!isAuthorized || cartItems?.length <= 0}
                sx={{
                  mt: 5,
                  padding: "3vh 0px 3vh 0px",
                  backgroundColor: "#FF2626",
                  color: "white",
                  fontSize: "3vh",
                  "&:hover": {
                    border: "2px solid red",
                    color: "red",
                  },
                }}
              >
                ชำระเงิน
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Cart;
