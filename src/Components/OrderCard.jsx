import {
  AccordionDetails,
  Box,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getImageUrl } from "../utils/utils";
import { getOrderDetailByOrderId } from "../apis/orderApi";

function OrderCard({ orderId }) {
  const [orderDetail, setOrderDetail] = useState([]);

  // console.log(orderId);
  useEffect(() => {
    getOrderDetailByOrderId(orderId).then((res) => {
      setOrderDetail(res?.data);
      console.log(res?.data);
    });
  }, []);

  return (
    <AccordionDetails>
      <Typography>
        {orderDetail?.map((item, index) => (
          <>
            <Card
              sx={{
                display: "flex",
                mb: 2,
                width: "100%",
                padding: "20px",
                backgroundColor: "#F7F7F7",
              }}
            >
              <Grid item md={3} sx={{ width: "100%", mr: 2 }}>
                <CardMedia
                  component="img"
                  height="200px"
                  image={
                    item?.Product?.picture
                      ? getImageUrl(item?.Product?.picture)
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
                    {/* {item?.name} */}
                    test
                  </Box>
                  <Box>
                    {/* <CloseIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    removeItemFromCart(index);
                  }}
                /> */}
                  </Box>
                </Box>
                <Box>รหัสสินค้า : {item?.Product?.id}</Box>
                <Box>ขนาด : {item?.size}</Box>
                <Box>
                  ราคา : {item?.Product?.price}
                  {/* {new Intl.NumberFormat("en-US").format(
                    item?.Product?.price * item?.quantity
                  )} */}
                </Box>
                <Box>จำนวนสินค้า </Box>
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
                      // onChange={(e) => {
                      //   setCartItems((prevCartItems) => {
                      //     const updatedCartItems = prevCartItems.map(
                      //       (item, itemIndex) => {
                      //         if (itemIndex === index) {
                      //           return {
                      //             ...item,
                      //             quantity: e?.target?.value || 0, // Use 0 if e?.target?.value is null or undefined
                      //           };
                      //         }
                      //         return item;
                      //       }
                      //     );
                      //     return updatedCartItems;
                      //   });
                      // }}
                      value={item?.quantity}
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
                      item?.quantity * item?.Product?.price
                    )}
                  </Box>
                </Box>
              </Grid>
            </Card>
          </>
        ))}
      </Typography>
    </AccordionDetails>
  );
}

export default OrderCard;
