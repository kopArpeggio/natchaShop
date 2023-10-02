import SearchIcon from "@mui/icons-material/Search";

import {
  Backdrop,
  Box,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchProduct } from "../../apis/productApi";

function SearchModal({ modalOpen, setModalOpen }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
          <TextField
            id="search"
            type="search"
            label="Search"
            //   value={searchTerm}
            onChange={(e) => {
              setSearch(e?.target?.value);
            }}
            sx={{ width: 600 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setModalOpen(false);
                      navigate({ pathname: "/shop", search: search });
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default SearchModal;
