import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import Carousel from "react-material-ui-carousel";
import { getNewProduct } from "./apis/productApi";
import { getImageUrl } from "./utils/utils";

function Home() {
  const [product, SetProduct] = useState([]);

  const handleDragStart = (e) => e.preventDefault();

  const srcset = (image, size, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  const itemData = [
    {
      img: "/assets/img/Kosuke-Kawamura_resize.jpg",
      title: "shirt",
    },
    {
      img: "/assets/img/Chainsaw_Man.JPG",
      title: "shirt1",
    },
  ];
  const itemData2 = [
    {
      img: "/assets/img/Capture.JPG",
      title: "shirt",
    },
    {
      img: "/assets/img/DRY-EX.JPG",
      title: "shirt1",
    },
  ];

  useEffect(() => {
    getNewProduct().then((res) => {
      SetProduct(
        res?.data?.map((item, itemIndex) => {
          return (
            <img
              src={
                item?.picture
                  ? getImageUrl(item?.picture)
                  : "/assets/img/no-image.png"
              }
              // width={300}
              height={200}
              onDragStart={handleDragStart}
              role="presentation"
              key={itemIndex}
            />
          );
        })
      );
    });
  }, []);

  // const responsive = {
  //   0: { items: 1 },
  //   568: { items: 2 },
  //   1024: { items: 3 },
  // };

  return (
    <div>
      {/* <Grid container>
        <Grid item xs={6}>
          test
        </Grid>
        <Grid item xs={6}>
          test
        </Grid>
      </Grid> */}
      <ImageList
        sx={{ width: "100%" }}
        variant="quilted"
        cols={2}
        rowHeight={"200"}
        gap={0}
      >
        {itemData2.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 3}
          >
            <img
              {...srcset(item.img, "1500", item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Container>
        <Divider
          variant="middle"
          color="black"
          sx={{
            mt: 5,
            mb: 2,
          }}
        />
      </Container>

      <Container
        sx={{
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ImageList
          sx={{ width: "100%", justifyContent: "center" }}
          variant="quilted"
          cols={2}
          rowHeight={"150"}
          gap={10}
        >
          {itemData?.map((item) => (
            <ImageListItem
              sx={{ display: "flex" }}
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 3}
            >
              <img
                {...srcset(item.img, "1000", item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar title={"ซื้อ"} />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <Container sx={{ width: "80%" }}>
        <Typography sx={{ mt: 8, fontWeight: "bold", mb: 2 }}>
          สินค้าออกใหม่
        </Typography>
        <AliceCarousel mouseTracking items={product} autoHeight autoWidth />
      </Container>

      {/* <ImageList
        sx={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
        }}
        variant="quilted"
        cols={2}
        rowHeight={"150"}
        gap={10}
      >
        {items.map((item) => (
          <ImageListItem
            key={item.image}
            cols={item.cols || 1}
            rows={item.rows || 3}
          >
            <img
              {...srcset(item.image, "1000", item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList> */}
    </div>
  );
}

export default Home;
