import React from "react";
import { useThemeUpdate } from "../context/ThemeContext";
import { Box } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

const Theme = () => {
  const toggleTheme = useThemeUpdate();
  const darkTheme = useTheme();

  return (
    <Box
      sx={{
        height:"100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background:darkTheme ? "black" : "white",
        padding:"10px",
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60px",
          fontWeight: "bold",
          color:darkTheme ? "black" : "white",
          background: darkTheme ? "white" : "black",
        }}
      >
        <h1>CHANGE DARK/LIGHT THEME</h1>
      </Box>

      <Box
        sx={{
          mt: "30px",
          cursor: "pointer",
          width: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color:darkTheme ? "black" : "white",
          background: darkTheme ? "white" : "black",
        }}
        onClick={toggleTheme}
      >
        <p>CHANGE THEME</p>
      </Box>
    </Box>
  );
};

export default Theme;
