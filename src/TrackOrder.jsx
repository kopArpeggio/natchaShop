import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
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
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import CloseIcon from "@mui/icons-material/Close";
import { getImageUrl } from "./utils/utils";
import PayModal from "./Components/Modal/PayModal";
import { getUserOrder } from "./apis/orderApi";
import OrderCard from "./Components/OrderCard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function TrackOrder() {
  const [order, setOrder] = useState([]);
  // const [idArray, setIdArray] = useState([]);

  useEffect(() => {
    getUserOrder().then((res) => {
      setOrder(res?.data);
      // setIdArray(res?.data?.map((order) => order?.id));
    });
  }, []);

  return (
    <div>
      <Container sx={{ maxWidth: "90%" }} maxWidth={false}>
        <Typography
          sx={{
            justifyContent: "center",
            display: "flex",
            fontSize: "3vh",
            fontWeight: "bold",
            mb: 5,
          }}
        >
          ติดตามพัสดุ
        </Typography>
        <Grid container spacing={2}>
          {order?.map((item, index) => (
            <>
              <Grid item md={8} key={index}>
                <Accordion >
                  <AccordionSummary
                    expandIcon={<ExpandLessIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>รหัสออเดอร์ : {item?.id}</Typography>
                  </AccordionSummary>
                  <OrderCard orderId={item?.id} />
                </Accordion>
              </Grid>
              <Grid item md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title="รหัสไปรษณีย์ แฟลช"
                    sx={{ backgroundColor: "#eaf79f" }}
                  />

                  <CardContent>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "150px",
                        fontWeight: "bold",
                        fontSize: "3vh",
                      }}
                    >
                      {item?.shippingTrack ? item?.shippingTrack : "ยังไม่มี"}
                    </Typography>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{ display: "flex", justifyContent: "end" }}
                  >
                    {item?.shippingTrack ? (
                      <IconButton>
                        <ContentCopyIcon
                          onClick={() => {
                            navigator.clipboard.writeText(item?.shippingTrack);
                          }}
                        />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </CardActions>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default TrackOrder;
