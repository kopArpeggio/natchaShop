import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HistoryOrderCard from "./Components/HistoryOrderCard";
import { getUserOrder } from "./apis/orderApi";

function OrderViewUser() {
  const [order, setOrder] = useState([]);
  const [idArray, setIdArray] = useState([]);

  useEffect(() => {
    getUserOrder().then((res) => {
      setOrder(res?.data);
      console.log(res?.data);
      setIdArray(res?.data?.map((order) => order?.id));
    });
  }, []);
  return (
    <div style={{ backgroundColor: "#E1E1E1" }}>
      <Typography
        component="div"
        sx={{ backgroundColor: "white" }}
        variant="h5"
      >
        ประวัติการสั่งซื้อ
      </Typography>
      <HistoryOrderCard orderIdArray={idArray} />
    </div>
  );
}

export default OrderViewUser;
