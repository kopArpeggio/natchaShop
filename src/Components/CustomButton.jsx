import React from "react";
import Button from "@mui/material/Button";

function CustomButton({ Title, Type }) {
  return (
    <div>
      <Button
        sx={{
          padding: "1vh 4vh",
          backgroundColor: "#18A0FB",
          fontSize: "18px",
          borderRadius: "2vh",
        }}
        type={Type ? Type : ""}
        variant="contained"
        size="large"
      >
        {Title}
      </Button>
    </div>
  );
}

export default CustomButton;
