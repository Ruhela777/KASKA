import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Asset Import (Matches Features Page Navbar)
import kaskaLogoSmall from "../assets/kaska_logo_small.png";

const CLIENT_ID = "431091486612-mier4k6idim1aiqs089mmti4eh15tq5a.apps.googleusercontent.com";
const API_KEY = "AIzaSyDc7my-wd1b82mhiHgp0uUw8nyoYC1ncrA";

const UploadDocumentsPage = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  // Handle local file selection
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      alert(`Selected local file for OCR: ${files[0].name}`);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      alert(`Dropped file for OCR: ${e.dataTransfer.files[0].name}`);
    }
  };

  // Google Picker Callback handling
  const pickerCallback = (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      const file = data.docs[0];
      console.log("Selected Cloud File Details:", file);
      alert(`Selected file from Google Drive for OCR: ${file.name}`);
    }
  };

  // Instantiates Google Cloud Resource Picker Layout View
  const createPicker = (token) => {
    if (window.google && window.google.picker) {
      const picker = new window.google.picker.PickerBuilder()
        .addView(window.google.picker.ViewId.DOCS)
        .setOAuthToken(token)
        .setDeveloperKey(API_KEY)
        .setCallback(pickerCallback)
        .build();

      picker.setVisible(true);
    } else {
      alert("Google Picker API failed to initialize. Check network script imports.");
    }
  };

  // Authenticates & Requests Access tokens directly via OAuth2 client
  const handleGoogleDriveClick = () => {
    if (!window.google || !window.google.accounts) {
      alert("Google Identity Platform Library not loaded yet.");
      return;
    }

    // Reuse valid token instance if already verified within the app state instance session
    if (authToken) {
      window.gapi.load("picker", () => createPicker(authToken));
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: "https://www.googleapis.com/auth/drive.readonly",
      callback: (tokenResponse) => {
        if (tokenResponse && tokenResponse.access_token) {
          setAuthToken(tokenResponse.access_token);
          window.gapi.load("picker", () => createPicker(tokenResponse.access_token));
        }
      },
    });

    tokenClient.requestAccessToken();
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(-45deg, #0077B6, #0496C7, #06283D, #16213E, #0f172a)`,
        backgroundSize: "400% 400%",
        animation: "fluidBackground 15s ease infinite",
        backgroundAttachment: "fixed",
        overflowX: "hidden",

        "@keyframes fluidBackground": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "@keyframes floatAnimation": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      }}
    >
      {/* NAVBAR */}
      <Box
        component="nav"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          height: { xs: 70, md: 80 },
          bgcolor: "rgba(6, 40, 61, 0.55)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "2px solid rgba(4, 150, 199, 0.4)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 10px rgba(4, 150, 199, 0.15)",
          zIndex: 100,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 3, md: 4 },
          }}
        >
          <Box
            onClick={() => navigate("/")}
            sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }}
          >
            <Box
              component="img"
              src={kaskaLogoSmall}
              alt="Kaska Logo"
              sx={{ width: 38, height: 38, objectFit: "contain" }}
            />
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.25rem",
                letterSpacing: "0.1em",
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              KASKA
            </Typography>
          </Box>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/ocr")}
            sx={{
              color: "rgba(255, 255, 255, 0.85)",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              "&:hover": { color: "#fff", bgcolor: "rgba(255, 255, 255, 0.05)" },
            }}
          >
            Back to Features
          </Button>
        </Container>
      </Box>

      {/* MAIN CONTAINER */}
      <Container
        maxWidth="md"
        sx={{
          pt: { xs: 16, md: 22 },
          pb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          zIndex: 2,
        }}
      >
        {/* HEADER TEXT WITH NEW SPECS */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 900,
              color: "#ffffff",
              mb: 1.5,
              letterSpacing: "-0.015em",
            }}
          >
            Uploading documents for OCR detection
          </Typography>
          <Typography
            sx={{
              color: "#D1EAF0",
              maxWidth: 540,
              margin: "0 auto",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.6,
            }}
          >
            Select your preferred file source to initiate text recognition, layouts, and data extraction.
          </Typography>
        </Box>

        {/* ALIGNED SYMMETRICAL SPLIT ROW */}
        <Grid 
          container 
          spacing={4} 
          justifyContent="center" 
          alignItems="stretch" 
          sx={{ maxWidth: 840, width: "100%" }}
        >
          
          {/* OPTION 1: LOCAL DEVICE DROPZONE */}
          <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column" }}>
            <Paper
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              sx={{
                p: 4,
                width: "100%",
                height: { xs: 280, sm: "320px" }, 
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                cursor: "pointer",
                borderRadius: 4,
                bgcolor: dragActive ? "rgba(4, 150, 199, 0.25)" : "rgba(6, 40, 61, 0.45)",
                backdropFilter: "blur(12px)",
                border: dragActive ? "2px dashed #D1EAF0" : "2px dashed rgba(4, 150, 199, 0.5)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                animation: "floatAnimation 6s ease-in-out infinite",
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: "#D1EAF0",
                  boxShadow: "0 15px 35px rgba(4, 150, 199, 0.25)",
                  bgcolor: "rgba(6, 40, 61, 0.65)",
                },
              }}
              component="label"
            >
              <input
                type="file"
                hidden
                multiple={false}
                accept=".png,.jpg,.jpeg,.pdf,.txt"
                onChange={handleFileChange}
              />
              <CloudUploadOutlinedIcon sx={{ fontSize: "3.5rem", color: "#D1EAF0", mb: 2 }} />
              <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 700, mb: 1 }}>
                Local Device
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", px: 1 }}>
                Drag & drop files here or browse storage
              </Typography>
            </Paper>
          </Grid>

          {/* OPTION 2: GOOGLE DRIVE IMPORT */}
          <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column" }}>
            <Paper
              onClick={handleGoogleDriveClick}
              sx={{
                p: 4,
                width: "100%",
                height: { xs: 280, sm: "320px" }, 
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                cursor: "pointer",
                borderRadius: 4,
                bgcolor: "rgba(6, 40, 61, 0.45)",
                backdropFilter: "blur(12px)",
                border: "2px solid rgba(4, 150, 199, 0.3)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                animation: "floatAnimation 6s ease-in-out infinite",
                animationDelay: "1.5s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: "#25a244",
                  boxShadow: "0 15px 35px rgba(37, 162, 68, 0.25)",
                  bgcolor: "rgba(6, 40, 61, 0.65)",
                },
              }}
            >
              <AddToDriveIcon sx={{ fontSize: "3.5rem", color: "#25a244", mb: 2 }} />
              <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 700, mb: 1 }}>
                Google Drive
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", px: 1 }}>
                Import cloud files seamlessly from Drive storage
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default UploadDocumentsPage;