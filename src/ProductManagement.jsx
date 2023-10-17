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
  getProductById,
  updateProductById,
} from "./apis/productApi";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import CustomButton from "./Components/CustomButton";
import { Title } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddProduct from "./Components/Modal/AddProduct";
import UpdateProduct from "./Components/Modal/UpdateProduct";
import { getImageUrl } from "./utils/utils";

function ProductManagement() {
  const [select, setSelect] = useState([]);
  const [rows, setRow] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    id: "",
  });
  const [productSize, setProductSize] = useState("");

  const currencyFormatter = new Intl.NumberFormat("en-US");

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
              image={
                params?.row?.picture
                  ? getImageUrl(params?.row?.picture)
                  : "/assets/img/no-image.png"
              } // Replace with the actual image URL
            />
          </Card>
        </div>
      ),
    },
    { field: "name", headerName: "ชื่อ", width: 130, flex: 2 },
    {
      field: "price",
      headerName: "ราคา",
      width: 130,
      align: "right",
      flex: 1,
      valueFormatter: ({ value }) => {
        const formattedValue = currencyFormatter.format(value);
        return `${formattedValue} บาท`;
      },
    },
    // {
    //   field: "quantity",
    //   headerName: "จำนวน",
    //   type: "number",
    //   width: 90,
    //   flex: 1,
    //   valueFormatter: ({ value }) => {
    //     const formattedValue = currencyFormatter.format(value);
    //     return `${formattedValue}`;
    //   },
    // },
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
              getProductById(params?.row?.id).then((res) => {
                setProduct(res?.data);
                setProductSize(res?.size);
                setModalUpdateOpen(true);
              });
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
      setModalUpdateOpen(false);
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
        <UpdateProduct
          handleClose={handleClose}
          setModalOpen={setModalUpdateOpen}
          modalOpen={modalUpdateOpen}
          product={product}
          productSize={productSize}
        />

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
