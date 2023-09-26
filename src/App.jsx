import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Components/Navbar";
import Product from "./Product";
import AllProduct from "./AllProduct";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import setupAxios from "./axios/setupAxios";
import ProductManagement from "./ProductManagement";
import ProfileManagement from "./ProfileManagement";
import Cart from "./Cart";
import PaymentView from "./PaymentView";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Prompt, sans-serif", // Replace with your desired font family
    },
  });

  const [count, setCount] = useState(0);

  const isAuthorized = localStorage.getItem("token");

  setupAxios(axios);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />

          {/* Your navigation or header can go here */}
          <Routes>
            {!isAuthorized ? (
              <Route path="/" element={<Login />} />
            ) : (
              <Route path="/" element={<AllProduct />} />
            )}

            <Route path="/shop" element={<AllProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/manage-product" element={<ProductManagement />} />
            <Route path="/product" element={<Product />} />
            <Route path="/profile" element={<ProfileManagement />} />
            <Route path="/payment" element={<PaymentView />} />
            {/* Add more routes as needed */}
          </Routes>
        </BrowserRouter>

        {/* <Login /> */}
        {/* <Product /> */}
        {/* <AllProduct /> */}
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default App;
