import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProductById, updateProductById } from "../../apis/productApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { getImageUrl } from "../../utils/utils";
import { createOrder } from "../../apis/orderApi";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SuccesfulALert } from "../Alert";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

function PayModal({ setModalOpen, modalOpen, order, setOrder }) {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const time = 300000;

  const style = {
    position: "absolute",
    display: "grid",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "2vh",
  };

  const Completionist = () => {
    localStorage.setItem("cartItems", "[]");
    localStorage.setItem("totalPrice", 0);
    setModalOpen(false);
    navigate("/shop");
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div>
      <Modal
        sx={{ overflow: "scroll" }}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setFile("");
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div>
          <Box sx={style}>
            <h2>ชำระภายใน 5 นาที</h2>
            <h4>
              <Countdown date={Date.now() + time} renderer={renderer} />
            </h4>
            <Typography sx={{ fontSize: "2.2vh" }}>
              ถ้าโอนยอดสำเสร็จ สามารถตรวจสอบเลขพัสดุ
            </Typography>
            <Typography sx={{ fontSize: "2.2vh" }}>
              หลังจากโอนเงินในวันถัดไป
            </Typography>
            <Typography></Typography>
            <Typography sx={{ fontSize: "2.2vh" }}>
              จะส่งเลขพัสดุได้เวลา 16.00 -17.00 น.
            </Typography>
            <Typography sx={{ fontSize: "2.2vh" }}>
              ตัดรอบส่ง เวลา 15.00 น. ของทุกวัน
            </Typography>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="300px"
                  //   weigth="20%"
                  image={"/assets/img/QR.png"}
                />

                <Box
                  sx={{
                    display: "grid",
                    justifyContent: "center",
                    width: "160",
                  }}
                >
                  <img
                    // src={!file ? "/assets/img/no-image.png" : file}
                    src={file ? file : "/assets/img/no-image.png"}
                    style={{ width: 150 }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "160",
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      margin: "5px",
                      backgroundColor: "#E1FF2B",
                      color: "black",
                      mt: 2,
                      "&:hover": {
                        backgroundColor: "white",
                        border: "1px solid #E1FF2B",
                      },
                    }}
                  >
                    <FileUploadIcon />
                    อัพโหลด
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setFile(reader.result);
                          setOrder({ ...order, file: e?.target?.files[0] });
                        };
                        reader.readAsDataURL(e?.target?.files[0]);
                      }}
                    />
                  </Button>
                  <Button
                    disabled={!file}
                    onClick={() => {
                      createOrder(order).then((res) => {
                        localStorage.setItem("cartItems", "[]");
                        localStorage.setItem("totalPrice", 0);
                        setModalOpen(false);
                        navigate("/shop");
                        SuccesfulALert("สั่งซื้อสำเร็จ !");
                      });
                    }}
                    variant="outlined"
                    component="label"
                    sx={{
                      margin: "5px",
                      backgroundColor: "#FF3838",
                      color: "white",
                      mt: 2,
                      "&:hover": {
                        backgroundColor: "white",
                        color: "red",
                        border: "1px solid red",
                      },
                    }}
                  >
                    ยืนยัน
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default PayModal;
