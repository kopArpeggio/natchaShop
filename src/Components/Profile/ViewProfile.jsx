import { Box, Grid, Typography } from "@mui/material";
import React from "react";

function ViewProfile({ member }) {
  return (
    <div>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Box sx={{  width: "50%" }}>
          <Typography sx={{ mb: 5, fontWeight: 800, fontSize: 32 }}>
            บัญชี
          </Typography>
          <Grid container spacing={20}>
            <Grid item xs={6}>
              <Typography sx={{ fontWeight: 800, fontSize: 30 }}>
                อีเมล
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
                {member?.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontWeight: 800, fontSize: 30 }}>
                โทรศัพท์
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
                {member?.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 800, fontSize: 30 }}>
                ชื่อ-สกุล
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
                {member?.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 800, fontSize: 30 }}>
                ที่อยู่
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
                {member?.address}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default ViewProfile;
