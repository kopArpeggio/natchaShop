import { Box, Button, CardMedia, Card, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllProduct } from "./apis/productApi";
import { DataGrid, GridPagination } from "@mui/x-data-grid";

import { getImageUrl } from "./utils/utils";
import { getOrder, getOrderById } from "./apis/orderApi";
import PaymentViewModal from "./Components/Modal/PaymentViewModal";

function PaymentView() {
  const [order, setOrder] = useState([]);
  const [item, setItem] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const currencyFormatter = new Intl.NumberFormat("en-US");

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "picture",
      headerName: "ภาพสลิปโอน",
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
                params?.row?.slipPicture
                  ? getImageUrl(params?.row?.slipPicture)
                  : "/assets/img/no-image.png"
              } // Replace with the actual image URL
            />
          </Card>
        </div>
      ),
    },
    {
      field: "name",
      headerName: "ชื่อลูกค้า",
      width: 130,
      flex: 2,
      renderCell: (params) => params?.row?.Member?.name,
    },
    {
      field: "price",
      headerName: "รวม",
      width: 130,
      align: "left",
      flex: 1,
      renderCell: (params) => {
        const formattedValue = currencyFormatter.format(
          params?.row?.totalPrice
        );
        return `${formattedValue} บาท`;
      },
    },
    {
      field: "quantity",
      headerName: "จำนวน",
      type: "number",
      width: 90,
      flex: 1,
      renderCell: (params) => {
        const formattedValue = currencyFormatter.format(
          params?.row?.OrderDetails?.length
        );
        return `${formattedValue} รายการ`;
      },
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
              getOrderById(params?.row?.id).then((res) => {
                setItem(res?.data);
                setModalOpen(true);
              });
            }}
          >
            รายละเอียด
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
    getAllProduct().then(() => {
      setModalOpen(false);
    });
  };

  useEffect(() => {
    getOrder().then((res) => {
      setOrder(res?.data);
      console.log(res?.data);
    });
  }, []);

  return (
    <div style={{ padding: "0px 20px 0px 20px" }}>
      <>
        <PaymentViewModal
          handleClose={handleClose}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          order={item}
        />

        <DataGrid
          sx={{ fontSize: "18px" }}
          disableRowSelectionOnClick
          rowHeight={80}
          rows={order}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          slots={{
            footer: () => (
              <>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {/* <Button
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
                                setItem(res?.data);
                              });
                            });
                          }}
                        >
                          <DeleteIcon />
                          ลบรายการที่เลือก
                        </Button>
                      )} */}
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

export default PaymentView;
