import {
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

function AddProduct({ modalOpen, setModalOpen, handleClose }) {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      setModalOpen(false); // Close the modal after submission
    },
  });

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            position: "absolute",
            width: 400,
            backgroundColor: "white",
            padding: 20,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h2 id="simple-modal-title">เพิ่มสินค้า</h2>

          {/* <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form> */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FormControl>
              <Box>
                {/* <Typography sx={{ fontSize: "3vh" }}>เพิ่มสินค้า</Typography> */}

                <TextField
                  required
                  onChange={(e) => {
                    setProduct({ ...product, name: e?.target?.value });
                  }}
                  id="standard-basic"
                  label="ชื่อสินค้า"
                  variant="standard"
                  sx={{ margin: "5px" }}
                />
              </Box>
              <Box>
                <TextField
                  onChange={(e) => {
                    setProduct({ ...product, price: e?.target?.value });
                  }}
                  required
                  sx={{ margin: "5px" }}
                  id="standard-basic"
                  label="ราคา"
                  variant="standard"
                />
              </Box>
              <Box>
                <TextField
                  onChange={(e) => {
                    setProduct({ ...product, quantity: e?.target?.value });
                  }}
                  required
                  sx={{ margin: "5px" }}
                  id="standard-basic"
                  label="จำนวนสินค้า"
                  variant="standard"
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ margin: "5px", mt: 2 }}
                >
                  ภาพสินค้า
                  <input type="file" hidden />
                </Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  onClick={() => {
                    createProduct(product).then((res) => {
                      handleClose();
                    });
                  }}
                  type="submit"
                  sx={{
                    mt: 5,
                    fontSize: "2vh",
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "white", color: "black" },
                  }}
                  variant="contained"
                >
                  เพิ่มสินค้า
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
                  }}
                >
                  ปิด
                </Button>
              </Box>
            </FormControl>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default AddProduct;
