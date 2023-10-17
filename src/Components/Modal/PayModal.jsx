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

function PayModal({ setModalOpen, modalOpen, order, setOrder }) {
  const [file, setFile] = useState();
  const navigate = useNavigate();

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
            <h2>โอนยอดภายใน ระยะเวลา 2 ชั้วโมง</h2>
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
