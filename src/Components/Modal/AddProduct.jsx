import {
  Backdrop,
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProduct } from "../../apis/productApi";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function AddProduct({ modalOpen, setModalOpen, handleClose }) {
  const [file, setFile] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("โปรดกรอกชื่อสินค้า"),
    price: Yup.number()
      .required("โปรดกรอกราคา")
      .positive("ต้องไม่ติดลบ")
      .integer("ต้องเป็นตัวเลขเท่านั้น")
      .typeError("ต้องเป็นตัวเลขเท่านั้น"),
    quantity: Yup.number()
      .required("โปรดกรอกจำนวนสินค้า")
      .positive("ต้องไม่ติดลบ")
      .integer("ต้องเป็นตัวเลขเท่านั้น")
      .typeError("ต้องเป็นตัวเลขเท่านั้น"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
      picture: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setValues }) => {
      createProduct(values).then(() => {
        setValues(formik.initialValues);
        handleClose(); // Close the modal after submission
      });
    },
  });

  const style = {
    position: "absolute",
    display: "flex",
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
  };

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => {
          formik.resetForm();
          setFile("");
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
        <Box sx={({ display: "flex", justifyContent: "center" }, style)}>
          <form onSubmit={formik?.handleSubmit} style={{ width: "100%" }}>
            <h2>แก้ไขข้อมูลสินค้า</h2>
            <Box>
              <TextField
                id="standard-basic"
                label="ชื่อสินค้า"
                sx={{ margin: "5px", width: "100%" }}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                name="name"
              />
            </Box>

            <Box>
              <TextField
                value={formik?.values?.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                name="price"
                sx={{ margin: "5px", width: "100%" }}
                id="standard-basic"
                label="ราคา"
              />
            </Box>

            <Box>
              <TextField
                value={formik?.values?.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
                name="quantity"
                sx={{ margin: "5px", width: "100%" }}
                id="standard-basic"
                label="จำนวนสินค้า"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "160",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  margin: "5px",
                  width: "100%",

                  mt: 2,
                }}
              >
                <FileUploadIcon />
                อัพโหลดภาพสินค้า
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setFile(reader.result);
                      formik.setFieldValue("picture", e?.target?.files[0]);
                    };
                    reader.readAsDataURL(e?.target?.files[0]);
                  }}
                />
              </Button>
            </Box>
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
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                type="submit"
                sx={{
                  mt: 5,
                  fontSize: "2vh",
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "white", color: "black" },
                }}
                variant="contained"
              >
                ยืนยัน
              </Button>
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
                  setFile("");
                }}
              >
                ปิด
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddProduct;
