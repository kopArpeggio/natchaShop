import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOrderDetailByOrderIdArray } from "../apis/orderApi";
import { getImageUrl } from "../utils/utils";

function HistoryOrderCard({ orderIdArray }) {
  console.log(orderIdArray);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getOrderDetailByOrderIdArray().then((res) => {
      console.log(res?.data);
      setOrder(res?.data);
    });
  }, []);

  return (
    <div>
      {order?.map((item, index) => (
        <>
          <Card sx={{ display: "flex", mb: 5 }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={1.5}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={
                      item?.Product?.picture
                        ? getImageUrl(item?.Product?.picture)
                        : "/assets/img/no-image.png"
                    }
                    alt="Live from space album cover"
                  />
                </Box>
              </Grid>
              <Grid item xs={10.5}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h6">
                      {item?.Product?.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="subtitle1" color="text.secondary">
                        Size: {item?.size}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        x{item?.quantity}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        color: "#d15f45",
                      }}
                    >
                      ฿
                      {new Intl.NumberFormat("en-US").format(
                        item?.Product?.price
                      )}{" "}
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
              <Divider
                variant="middle"
                color="#E1E1E1"
                sx={{ mt: 2, mb: 2, width: "100%" }}
              />
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2,
                  }}
                >
                  <Typography color="text.secondary">
                    {item?.quantity} ชิ้น
                  </Typography>
                  <Typography color="text.secondary">
                    รวมการสั่งซื้อ :
                    <span style={{ color: "#d15f45" }}>
                      ฿
                      {new Intl.NumberFormat("en-US").format(
                        item?.quantity * item?.Product?.price
                      )}
                    </span>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </>
      ))}
    </div>
  );
}

export default HistoryOrderCard;
