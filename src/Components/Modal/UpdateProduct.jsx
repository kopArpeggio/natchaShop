import { Backdrop, Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProductById, updateProductById } from "../../apis/productApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { getImageUrl } from "../../utils/utils";
import { SuccesfulALert } from "../Alert";

function UpdateProduct({
  setModalOpen,
  modalOpen,
  handleClose,
  product,
  productSize,
}) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("โปรดกรอกชื่อสินค้า"),
    price: Yup.number()
      .required("โปรดกรอกราคา")
      .positive("ต้องไม่ติดลบ")
      .integer("ต้องเป็นตัวเลขเท่านั้น")
      .typeError("ต้องเป็นตัวเลขเท่านั้น"),
    s: Yup.number()
      .positive("ต้องไม่ติดลบ")
      .integer("ต้องเป็นตัวเลขเท่านั้น")
      .typeError("ต้องเป็นตัวเลขเท่านั้น"),
    m: Yup.number()
      .positive("ต้องไม่ติดลบ")
      .integer("ต้องเป็นตัวเลขเท่านั้น")
      .typeError("ต้องเป็นตัวเลขเท่านั้น"),
    l: Yup.number()
      .positive("ต้องไม่ติดลบ")
      .integer("ต้องเป็นตัวเลขเท่านั้น")
      .typeError("ต้องเป็นตัวเลขเท่านั้น"),
    x: Yup.number()
      .positive("ต้องไม่ติดลบ")
      .integer("ต้องเป็นตัวเลขเท่านั้น")
      .typeError("ต้องเป็นตัวเลขเท่านั้น"),
    xl: Yup.number()
      .positive("ต้องไม่ติดลบ")
      .integer("ต้องเป็นตัวเลขเท่านั้น")
      .typeError("ต้องเป็นตัวเลขเท่านั้น"),
    freeSize: Yup.number()
      .positive("ต้องไม่ติดลบ")
      .integer("ต้องเป็นตัวเลขเท่านั้น")
      .typeError("ต้องเป็นตัวเลขเท่านั้น"),
  });

  const [file, setFile] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product ? product?.name : "",
      price: product ? product?.price : "",
      quantity: product ? product?.quantity : "",
      id: product ? product?.id : "",
      sizeId: product ? product?.Size?.id : "",
      s: product ? product?.Size?.s : "",
      m: product ? product?.Size?.m : "",
      l: product ? product?.Size?.l : "",
      x: product ? product?.Size?.x : "",
      xl: product ? product?.Size?.xl : "",
      freeSize: product ? product?.Size?.freeSize : "",
      stock1: productSize[0]?.stock,
      stock2: productSize[1]?.stock,
      stock3: productSize[2]?.stock,
      stock4: productSize[3]?.stock,
      stock5: productSize[4]?.stock,
      stock6: productSize[5]?.stock,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // values.productSize = productSize;
      updateProductById(values).then(() => {
        SuccesfulALert("อัพเดทสินค้าสำเร็จ");
        setFile("");
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
          setModalOpen(false);
          formik.resetForm();
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
        <Box sx={({ display: "flex", justifyContent: "center" }, style)}>
          <form onSubmit={formik?.handleSubmit} style={{ width: "100%" }}>
            <h2>แก้ไขข้อมูลสินค้า</h2>
            <Box>
              <TextField
                id="standard-basic"
                label="ชื่อสินค้า"
                sx={{ margin: "5px", width: "100%" }}
                defaultValue={product?.name || formik.values.name || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                name="name"
              />
            </Box>

            <Box>
              <TextField
                value={formik?.values?.price || product?.price || ""}
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

            {/* <Box>
              <TextField
                value={formik?.values?.quantity || product?.quantity || ""}
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
            </Box> */}

            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div style={{ display: "flex" }}>
                <TextField
                  id="filled-multiline-flexible"
                  label="S"
                  type="number"
                  variant="filled"
                  name="stock1"
                  defaultValue={
                    formik?.values?.stock1 || productSize[0]?.stock || "0"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.s && Boolean(formik.errors.s)}
                  helperText={formik.touched.s && formik.errors.s}
                />
                <TextField
                  id="filled-textarea"
                  label="M"
                  type="number"
                  variant="filled"
                  name="stock2"
                  defaultValue={
                    formik?.values?.stock2 || productSize[1]?.stock || "0"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.m && Boolean(formik.errors.m)}
                  helperText={formik.touched.m && formik.errors.m}
                />
                <TextField
                  id="filled-multiline-static"
                  label="L"
                  type="number"
                  variant="filled"
                  name="stock3"
                  defaultValue={
                    formik?.values?.stock3 || productSize[2]?.stock || "0"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.l && Boolean(formik.errors.l)}
                  helperText={formik.touched.l && formik.errors.l}
                />
                <TextField
                  id="filled-multiline-static"
                  label="X"
                  type="number"
                  variant="filled"
                  name="stock4"
                  defaultValue={
                    formik?.values?.stock4 || productSize[3]?.stock || "0"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.size && Boolean(formik.errors.size)}
                  helperText={formik.touched.size && formik.errors.size}
                />
                <TextField
                  id="filled-multiline-static"
                  label="XL"
                  type="number"
                  variant="filled"
                  name="stock5"
                  defaultValue={
                    formik?.values?.stock5 || productSize[4]?.stock || "0"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.xl && Boolean(formik.errors.xl)}
                  helperText={formik.touched.xl && formik.errors.xl}
                />
                <TextField
                  id="filled-multiline-static"
                  label="FS"
                  type="number"
                  variant="filled"
                  name="stock6"
                  defaultValue={
                    formik?.values?.stock6 || productSize[5]?.stock || "0"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.freeSize && Boolean(formik.errors.freeSize)
                  }
                  helperText={formik.touched.freeSize && formik.errors.freeSize}
                />
              </div>
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
                src={
                  file
                    ? file
                    : product?.picture
                    ? getImageUrl(product?.picture)
                    : "/assets/img/no-image.png"
                }
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
                  formik.resetForm();
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

export default UpdateProduct;
