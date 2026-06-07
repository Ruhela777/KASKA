import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import kaskaLogo from "../assets/kaska.png";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/ocr"), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(270deg, #F1FAEE 0%, #0A9396 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={kaskaLogo}
        alt="Kaska logo"
        sx={{ width: { xs: 160, md: 280 }, height: "auto", objectFit: "contain", zIndex: 1 }}
      />
    </Box>
  );
};

export default MainPage;
