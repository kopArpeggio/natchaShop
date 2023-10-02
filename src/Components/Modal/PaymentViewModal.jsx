import {
  Backdrop,
  Box,
  Button,
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

function PaymentViewModal({ setModalOpen, modalOpen, handleClose, order }) {
  const style = {
    position: "absolute",
    display: "grid",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "2vh",
    mt: 10,
  };

  return (
    <div>
      <Modal
        sx={{ overflow: "scroll" }}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
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
        <Box sx={({ display: "grid", justifyContent: "center" }, style)}>
          <h2>แก้ไขข้อมูลสินค้า</h2>
          <Box>
            <TextField
              aria-readonly
              id="standard-basic"
              label="ชื่อลูกค้า"
              value={order?.Member?.name}
              sx={{ margin: "5px", width: "100%" }}
              name="name"
            />
          </Box>
          <Box>
            <TextField
              aria-readonly
              id="standard-basic"
              label="ที่อยู่"
              multiline
              maxRows={6}
              rows={2}
              value={order?.Member?.address}
              sx={{ margin: "5px", width: "100%" }}
              name="name"
            />
          </Box>

          <Box>
            <TextField
              aria-readonly
              id="standard-basic"
              label="รายการสินค้า"
              multiline
              maxRows={6}
              rows={6}
              value={
                order?.OrderDetails
                  ? order?.OrderDetails?.map((item, index) =>
                      `${item?.Product?.name} ${item?.size} ${item?.quantity} ชิ้น`
                    ).join(", ")
                  : ""
              }
              sx={{ margin: "5px", width: "100%" }}
              name="name"
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              justifyContent: "center",
              width: "160",
            }}
          >
            <Typography>สลิปโอนเลิน :</Typography>
            <img
              src={
                order?.slipPicture
                  ? getImageUrl(order?.slipPicture)
                  : "/assets/img/no-image.png"
              }
              style={{ width: 350 }}
            />
          </Box>
          <Box>
            <TextField
              aria-readonly
              id="standard-basic"
              label="ยอดรวมทั้งหมด"
              value={`${new Intl.NumberFormat("en-US").format(
                order?.totalPrice
              )} บาท`}
              sx={{ margin: "5px", width: "100%", mt: 3 }}
              name="name"
            />
          </Box>
          <Box sx={{ display: "grid", justifyContent: "center" }}>
            <Button
              sx={{
                mt: 5,
                fontSize: "2vh",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "white", color: "black" },
              }}
              variant="contained"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              ปิด
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default PaymentViewModal;
