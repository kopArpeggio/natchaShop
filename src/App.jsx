import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Components/Navbar";
import Product from "./Product";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "font-family: 'Prompt', sans-serif", // Replace with your desired font family
    },
  });

  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />

      <ThemeProvider theme={theme}>
        <Login />
        {/* <Product /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
