import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
} from "./apis/productApi";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import CustomButton from "./Components/CustomButton";
import { Title } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddProduct from "./Components/Modal/AddProduct";

function ProductManagement() {
  const [select, setSelect] = useState([]);
  const [rows, setRow] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "picture",
      headerName: "ภาพสินค้า",
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Card>
            <CardMedia
              component="img"
              alt="Product Image"
              height="120"
              image="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80" // Replace with the actual image URL
            />
          </Card>
        </div>
      ),
    },
    { field: "name", headerName: "ชื่อ", width: 130, flex: 2 },
    { field: "price", headerName: "ราคา", width: 130, flex: 1 },
    {
      field: "quantity",
      headerName: "จำนวน",
      type: "number",
      width: 90,
      flex: 1,
    },
    {
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Button variant="contained" color="success">{params?.row?.price}</Button> */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
              },
            }}
            onClick={() => {
              console.log(params?.row?.id);
            }}
          >
            แก้ไข
          </Button>
        </div>
      ),
      headerName: "",
      type: "number",
      width: 150,
      flex: 1,
    },
  ];

  const handleClose = () => {
    getAllProduct().then((res) => {
      setRow(res?.data);
      setModalOpen(false);
    });
  };

  useEffect(() => {
    getAllProduct().then((res) => {
      setRow(res?.data);
    });
  }, []);

  return (
    <div style={{ padding: "0px 20px 0px 20px" }}>
      <>
        <AddProduct
          handleClose={handleClose}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <Box>
              <Typography sx={{ fontSize: "3vh" }}>เพิ่มสินค้า</Typography>

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
                disabled
                variant="contained"
                component="label"
                sx={{ margin: "5px", mt: 2 }}
              >
                ภาพสินค้า
                <input type="file" hidden />
              </Button>
            </Box>
            <Button
              onClick={() => {
                createProduct(product);
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
          </FormControl>
        </Box> */}

        <DataGrid
          sx={{ fontSize: "18px" }}
          disableRowSelectionOnClick
          rowHeight={80}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          onRowSelectionModelChange={(val) => {
            setSelect(val);
          }}
          slots={{
            footer: () => (
              <>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        sx={{ ml: 1, mt: 1, fontSize: 16 }}
                        color="info"
                        onClick={() => setModalOpen(true)}
                      >
                        <AddIcon />
                        เพิ่มสินค้า
                      </Button>
                      {select?.length === 0 ? (
                        ""
                      ) : (
                        <Button
                          variant="contained"
                          sx={{ ml: 2, mt: 1, fontSize: 16 }}
                          color="error"
                          onClick={() => {
                            deleteProductById({ select }).then((res) => {
                              getAllProduct().then((res) => {
                                setRow(res?.data);
                              });
                              console.log(res);
                            });
                          }}
                        >
                          <DeleteIcon />
                          ลบรายการที่เลือก
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", justifyContent: "end" }}
                    >
                      <GridPagination />
                    </Grid>
                  </Grid>
                </Box>
              </>
            ),
          }}
        />
      </>
    </div>
  );
}

export default ProductManagement;
