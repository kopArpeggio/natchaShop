import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import CustomButton from "../CustomButton";
import { updateMemberById } from "../../apis/memberApi";
import { SuccesfulALert } from "../Alert";

function EditProfile({ member, getUser }) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("โปรดกรอกชื่อ"),
    phone: Yup.string().required("โปรดกรอกเบอร์ติดต่อ"),
    address: Yup.string().required("โปรดกรอกที่อยู่"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: member ? member?.name : "",
      phone: member ? member?.phone : "",
      address: member ? member?.address : "",
      id: member ? member?.id : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateMemberById(values).then((res) => {
        getUser();
        console.log(res?.data);
        SuccesfulALert("Update Profile Succesful !");
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik?.handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box
            sx={{ width: "50%", justifyContent: "center", display: "block" }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ mb: 5, fontWeight: 800, fontSize: 32 }}>
                แก้ไขบัญชี
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
              <TextField
                id="standard-basic"
                label="ชื่อ-สกุล"
                variant="filled"
                sx={{ width: "100%" }}
                defaultValue={member?.name || formik.values.name || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                name="name"
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
              <TextField
                id="phone"
                label="เบอโทรศัพท์"
                variant="filled"
                sx={{ width: "100%" }}
                defaultValue={member?.phone || formik.values.phone || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                name="phone"
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
              <TextField
                id="address"
                label="ที่อยู่"
                variant="filled"
                sx={{ width: "100%" }}
                defaultValue={member?.address || formik.values.address || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                name="address"
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Button
                type="submit"
                sx={{
                  mt: 5,
                  fontSize: "2vh",
                  backgroundColor: "black",
                  padding: "2vh 3vh 2vh 3vh",

                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    border: "2px solid black",
                  },
                }}
                variant="contained"
              >
                บันทึกการเปลี่ยนแปลง
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default EditProfile;
