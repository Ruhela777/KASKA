import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSwipeable } from "react-swipeable";

// Asset Imports
import kaskaLogoSmall from "../assets/kaska_logo_small.png";
import ocrImage from "../assets/ocr.png";
import microLearningImage from "../assets/micro_learning.png";
import diagramImage from "../assets/diagram.png";
import quizImage from "../assets/quiz.png";

const FeaturesPage = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef(null);

  const sections = [
    {
      title: "OCR Text Extraction",
      highlight: "Accurate and Fast Text Recognition",
      description:
        "Extract printed and handwritten text from documents, notes, and images with intelligent OCR technology.",
      image: ocrImage,
      bullets: [
        "Handwritten and printed text support",
        "Smart layout detection",
        "Exportable editable results",
      ],
      route: "/upload", // Updated to point to UploadDocumentsPage
    },
    {
      title: "Micro-Learning Capsules",
      highlight: "Short Lessons for Busy Learners",
      description:
        "Learn faster with bite-sized educational capsules designed for quick revision and concept mastery.",
      image: microLearningImage,
      bullets: [
        "Fast concept summaries",
        "Quick review mode",
        "Perfect for exam preparation",
      ],
      route: "/upload", // Updated to point to UploadDocumentsPage
    },
    {
      title: "Diagram Recognition",
      highlight: "Convert Sketches Into Diagrams",
      description:
        "Transform hand-drawn diagrams and flowcharts into structured digital content instantly.",
      image: diagramImage,
      bullets: [
        "Auto shape detection",
        "Editable output",
        "Supports mind maps and charts",
      ],
      route: "/upload", // Updated to point to UploadDocumentsPage
    },
    {
      title: "Quiz Splash Experience",
      highlight: "Interactive Knowledge Checks",
      description:
        "Boost retention with engaging quizzes, instant feedback, and progress tracking.",
      image: quizImage,
      bullets: [
        "Dynamic question rounds",
        "Progress tracking",
        "Learn with confidence",
      ],
      route: "/upload", // Updated to point to UploadDocumentsPage
    },
  ];

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev === sections.length - 1 ? 0 : prev + 1));
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev === 0 ? sections.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      autoPlayTimer.current = setInterval(() => {
        nextFeature();
      }, 5000);
    }

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isHovered]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextFeature,
    onSwipedRight: prevFeature,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        height: "100vh", 
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(-45deg, #0077B6, #0496C7, #06283D, #16213E, #0f172a)`,
        backgroundSize: "400% 400%",
        animation: "fluidBackground 15s ease infinite",
        backgroundAttachment: "fixed",
        overflow: "hidden", 

        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",

        "@keyframes fluidBackground": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "@keyframes floatAnimation": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "@keyframes driftParticles": {
          "0%": { transform: "translate(0px, 0px) rotate(0deg) scale(1)" },
          "50%": { transform: "translate(40px, -60px) rotate(180deg) scale(1.1)" },
          "100%": { transform: "translate(0px, 0px) rotate(360deg) scale(1)" },
        },
      }}
    >
      {/* Aesthetic Blended Animated Background Orb */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: 350, md: 700 },
          height: { xs: 350, md: 700 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(209,234,240,0.12) 0%, transparent 70%)",
          top: "-15%",
          left: "-10%",
          filter: "blur(60px)",
          pointerEvents: "none",
          animation: "driftParticles 25s infinite ease-in-out",
          zIndex: 1,
        }}
      />

      {/* DISTINCT GLASSMORPHISM NAVBAR */}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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

          <Stack direction="row" spacing={1.5}>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                color: "rgba(255, 255, 255, 0.85)",
                textTransform: "none",
                fontWeight: 600,
                px: 2.5,
                fontSize: "0.9rem",
                transition: "all 0.2s",
                "&:hover": {
                  color: "#fff",
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                bgcolor: "#D1EAF0",
                color: "#0077B6",
                fontWeight: 700,
                textTransform: "none",
                px: 3,
                borderRadius: 2,
                boxShadow: "0 4px 14px rgba(209, 234, 240, 0.25)",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#ffffff",
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 18px rgba(209, 234, 240, 0.4)",
                },
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* HERO SECTION SLIDER CONTAINER */}
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 3, md: 4 },
          pt: { xs: 12, md: 14 }, 
          pb: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", 
          flexGrow: 1,
          height: "100%",
          position: "relative",
          zIndex: 2,
          overflow: "hidden", 
        }}
      >
        {/* SLIDER WRAPPER */}
        <Box
          {...swipeHandlers}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            position: "relative",
            width: "100%",
            margin: "auto 0",
            cursor: "grab",
            "&:active": { cursor: "grabbing" },
            zIndex: 3,
          }}
        >
          <Box
            key={currentFeature}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: 4, md: 4 },
              width: "100%",
              animation: "heroFadeIn 0.55s cubic-bezier(0.25, 1, 0.5, 1) both",
              "@keyframes heroFadeIn": {
                "0%": { opacity: 0, transform: "translateX(25px)" },
                "100%": { opacity: 1, transform: "translateX(0)" },
              },
            }}
          >
            {/* LEFT TEXT COMPONENT */}
            <Box
              sx={{
                flex: { xs: "1 1 auto", md: "0 0 52%" }, 
                width: "100%",
                maxWidth: { md: 560 },
                display: "flex",
                flexDirection: "column",
                order: { xs: 2, md: 1 },
              }}
            >
              <Typography
                sx={{
                  color: "#D1EAF0",
                  fontWeight: 800,
                  fontSize: { xs: "0.75rem", md: "0.85rem" }, 
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  mb: 0.5,
                }}
              >
                {sections[currentFeature].title}
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "1.85rem", md: "2.2rem" }, 
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.2,
                  mb: 1.5,
                  letterSpacing: "-0.015em",
                }}
              >
                {sections[currentFeature].highlight}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.55,
                  fontSize: { xs: "0.9rem", md: "1rem" }, 
                  mb: 2.5,
                }}
              >
                {sections[currentFeature].description}
              </Typography>

              <Stack spacing={1} sx={{ mb: 3 }}>
                {sections[currentFeature].bullets.map((bullet, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <CheckCircleOutlineOutlinedIcon
                      sx={{ color: "#D1EAF0", fontSize: { xs: "1rem", md: "1.15rem" } }}
                    />
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: 500,
                        fontSize: { xs: "0.88rem", md: "0.95rem" }, 
                      }}
                    >
                      {bullet}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Button
                variant="contained"
                onClick={() => navigate(sections[currentFeature].route)}
                sx={{
                  width: "fit-content",
                  bgcolor: "#D1EAF0",
                  color: "#0077B6",
                  px: 4.5,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: "0.9rem", 
                  boxShadow: "0 4px 15px rgba(209,234,240,0.2)",
                  "&:hover": {
                    bgcolor: "#ffffff",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 20px rgba(209,234,240,0.35)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Explore Feature
              </Button>
            </Box>

            {/* RIGHT SIDE GRAPHIC BLOCK */}
            <Box
              sx={{
                flex: { xs: "1 1 auto", md: "0 0 45%" }, 
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                order: { xs: 1, md: 2 },
              }}
            >
              <Box
                component="img"
                src={sections[currentFeature].image}
                alt={sections[currentFeature].title}
                sx={{
                  width: "100%",
                  maxWidth: { xs: 240, sm: 320, md: 410 },
                  maxHeight: { xs: 200, md: 320 },
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                  filter: "drop-shadow(0 20px 35px rgba(0,0,0,0.4)) drop-shadow(0 4px 10px rgba(0,0,0,0.25))",
                  animation: "floatAnimation 4.5s ease-in-out infinite",
                }}
              />
            </Box>
          </Box>

          {/* FLOATING NAVIGATION ARROWS */}
          <IconButton
            onClick={prevFeature}
            aria-label="Previous Slide"
            sx={{
              position: "absolute",
              left: { xs: -10, lg: -60 },
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.45)",
              "&:hover": {
                color: "#ffffff",
                bgcolor: "rgba(255,255,255,0.08)",
              },
              width: 44,
              height: 44,
              zIndex: 10,
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: "2.4rem" }} />
          </IconButton>

          <IconButton
            onClick={nextFeature}
            aria-label="Next Slide"
            sx={{
              position: "absolute",
              right: { xs: -10, lg: -60 },
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.45)",
              "&:hover": {
                color: "#ffffff",
                bgcolor: "rgba(255,255,255,0.08)",
              },
              width: 44,
              height: 44,
              zIndex: 10,
            }}
          >
            <ChevronRightIcon sx={{ fontSize: "2.4rem" }} />
          </IconButton>
        </Box>

        {/* HERO PAGINATION INDICATORS */}
        <Stack
          direction="row"
          spacing={1.2}
          justifyContent="flex-start"
          sx={{ mt: { xs: 4, md: 5 }, mb: 0 }}
        >
          {sections.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentFeature(index)}
              sx={{
                width: currentFeature === index ? 35 : 9,
                height: 5,
                borderRadius: 3,
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                bgcolor:
                  currentFeature === index ? "#D1EAF0" : "rgba(255,255,255,0.25)",
                "&:hover": {
                  bgcolor: currentFeature === index ? "#D1EAF0" : "rgba(255,255,255,0.5)",
                },
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default FeaturesPage;