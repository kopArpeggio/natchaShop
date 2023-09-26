import { Backdrop, Box, Button, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { registerMember } from "../../apis/memberApi";

function RegisterModal({ modalOpen, setModalOpen }) {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("ต้องเป็นอีเมลเท่านั้น")
      .required("โปรดกรอกอีเมลย์"),
    username: Yup.string().required("โปรดกรอก Username"),
    password: Yup.string().min(6).required("โปรดกรอก Password"),
    name: Yup.string().required("โปรดกรอก ชื่อ - นามสกุล"),
    phone: Yup.string().required("โปรดกรอกเบอร์โทรศัพท์"),
    address: Yup.string().required("โปรดกรอกที่อยู่"),
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      username: "",
      password: "",
      name: "",
      phone: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerMember(values).then((res) => {
        console.log(res?.data);
      });
    },
  });

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => {
          formik.resetForm();
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
            <h2>สมัครสมาชิก</h2>
            <Box>
              <TextField
                required
                id="email"
                label="อีเมล"
                sx={{ margin: "5px", width: "100%" }}
                defaultValue={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                name="email"
              />
            </Box>
            <Box>
              <TextField
                required
                id="username"
                label="ชื่อผู้ใช้"
                sx={{ margin: "5px", width: "100%" }}
                defaultValue={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                name="username"
              />
            </Box>
            <Box>
              <TextField
                required
                id="password"
                label="รหัสผ่าน"
                type="password"
                sx={{ margin: "5px", width: "100%" }}
                defaultValue={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                name="password"
              />
            </Box>
            <Box>
              <TextField
                required
                id="name"
                label="ชื่อ - สกุล"
                sx={{ margin: "5px", width: "100%" }}
                defaultValue={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                name="name"
              />
            </Box>
            <Box>
              <TextField
                required
                id="phone"
                label="เบอร์"
                sx={{ margin: "5px", width: "100%" }}
                defaultValue={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                name="phone"
              />
            </Box>
            <Box>
              <TextField
                required
                id="address"
                label="ที่อยู่"
                sx={{ margin: "5px", width: "100%" }}
                defaultValue={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                name="address"
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                // onClick={() => {
                //   createProduct(product).then((res) => {
                //     handleClose();
                //   });
                // }}
                type="submit"
                sx={{
                  mt: 5,
                  fontSize: "2vh",
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "white", color: "black" },
                }}
                variant="contained"
              >
                ลงทะเบียน
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default RegisterModal;
