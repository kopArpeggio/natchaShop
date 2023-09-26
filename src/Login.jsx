import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomButton from "./Components/CustomButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import RegisterModal from "./Components/Modal/RegisterModal";
import * as Yup from "yup";
import { loginMember } from "./apis/rootApi";
import { useFormik } from "formik";

const cardContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};
function Login() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("โปรดกรอก Username"),
    password: Yup.string().required("โปรดกรอก Password"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginMember(values).then((user) => {
        localStorage.setItem("token", user?.accessToken);
        window.location.reload();
      });
    },
  });

  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <RegisterModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <form onSubmit={formik?.handleSubmit}>
        <Card
          sx={{
            borderRadius: "1vh",
            maxWidth: 1217,
            width: 600,
            height: 400,
            maxHeight: 857,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
          }}
        >
          <div style={cardContainerStyle}>
            <CardMedia
              // sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent sx={{ width: 550 }}>
              <Typography
                sx={{ textAlign: "left" }}
                gutterBottom
                variant="h5"
                mt={2}
                mb={2}
                component="div"
              >
                เข้าสู่ระบบ
              </Typography>
              <TextField
                fullWidth
                name="username"
                id="username"
                label="ชื่อผู้ใช้"
                variant="standard"
                sx={{ mb: 3 }}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                fullWidth
                name="password"
                id="password"
                type="password"
                label="รหัสผ่าน"
                sx={{ mb: 3 }}
                variant="standard"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Typography
                sx={{
                  textAlign: "left",
                  "&:hover": {
                    cursor: "pointer",
                    textDecoration: "underline",
                  },
                }}
                gutterBottom
                variant="h5"
                mt={2}
                className="test"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                สมัครสมาชิก
              </Typography>
            </CardContent>

            <CardActions
              sx={{
                justifyContent: "space-between",
                width: "90%",
                mb: 3,
              }}
            >
              <CustomButton Title={"ล็อกอิน"} Type={"submit"} />
              <CustomButton Title={"ยกเลิก"} />
            </CardActions>
          </div>
        </Card>
      </form>
    </div>
  );
}

export default Login;
