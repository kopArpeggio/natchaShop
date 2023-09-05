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

const cardContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};
function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          borderRadius: "1vh",
          maxWidth: 1217,
          width: 500,
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
          <CardContent sx={{ width: 450 }}>
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
              id="standard-basic"
              label="Username"
              variant="standard"
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              id="standard-basic"
              label="Password"
              sx={{ mb: 3 }}
              variant="standard"
            />
            <Typography
              sx={{ textAlign: "left" }}
              gutterBottom
              variant="h5"
              mt={2}
              component="div"
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
            <CustomButton Title={"ล็อกอิน"} />
            <CustomButton Title={"ยกเลิก"} />
          </CardActions>
        </div>
      </Card>
    </div>
  );
}

export default Login;
