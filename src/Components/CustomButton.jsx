import React from "react";
import Button from "@mui/material/Button";

function CustomButton({ Title }) {
  return (
    <div>
      <Button
        sx={{
          padding: "1vh 4vh",
          backgroundColor: "#18A0FB",
          fontSize: "18px",
          borderRadius: "2vh",
        }}
        variant="contained"
        size="large"
      >
        {Title}
      </Button>
    </div>
  );
}

export default CustomButton;
