import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import kaskaLogoSmall from "../assets/kaska_logo_small.png";
import ocrImage from "../assets/ocr.png";
import microLearningImage from "../assets/micro_learning.png";
import diagramImage from "../assets/diagram.png";
import quizImage from "../assets/quiz.png";

const FeaturesPage = () => {
  const navigate = useNavigate();

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
      route: "/ocr",
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
      route: "/microlearning",
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
      route: "/diagram",
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
      route: "/quiz",
    },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        minHeight: "100vh",
        width: "100vw",
        minWidth: "100vw",
        background: `
          radial-gradient(circle at top left, rgba(56,178,172,0.22), transparent 30%),
          radial-gradient(circle at bottom right, rgba(10,147,150,0.22), transparent 35%),
          linear-gradient(135deg, #041C32 0%, #064663 45%, #0A9396 100%)
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowX: "hidden",
      }}
    >
      {/* Background Blobs */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          top: -120,
          left: -120,
          filter: "blur(20px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
          bottom: -200,
          right: -200,
          filter: "blur(30px)",
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          maxWidth: "100%",
          px: 0,
          py: 4,
          position: "relative",
          zIndex: 1,
          mx: 0,
        }}
      >
        {/* NAVBAR */}
        <Paper
          elevation={0}
          sx={{
            position: "sticky",
            top: 20,
            zIndex: 100,
            mb: 8,
            px: 4,
            py: 2,
            borderRadius: 5,
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                component="img"
                src={kaskaLogoSmall}
                alt="Kaska"
                sx={{
                  width: 50,
                  height: 50,
                }}
              />

              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  letterSpacing: "0.08em",
                }}
              >
                KASKA
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Login
              </Button>

              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  bgcolor: "#fff",
                  color: "#0A9396",
                  fontWeight: 700,
                  textTransform: "none",
                  px: 4,
                  borderRadius: 3,
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Box>
        </Paper>

        {/* HERO */}
        <Box
          sx={{
            textAlign: "center",
            color: "#fff",
            mb: 10,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "2.8rem",
                md: "5rem",
              },
              fontWeight: 900,
              lineHeight: 1.05,
              mb: 3,
            }}
          >
            Learn Smarter.
            <br />
            Create Faster.
          </Typography>

          <Typography
            sx={{
              maxWidth: 850,
              mx: "auto",
              fontSize: "1.15rem",
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Experience intelligent OCR, diagram recognition,
            micro-learning capsules, and interactive quizzes
            designed to make learning more engaging and productive.
          </Typography>
        </Box>

        {/* FEATURES */}
        <Stack spacing={6}>
          {sections.map((section, index) => (
            <Paper
              key={section.title}
              elevation={0}
              sx={{
                borderRadius: 6,
                overflow: "hidden",
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(20px)",
                transition: "all .35s ease",
                boxShadow: "0 25px 60px rgba(0,0,0,.18)",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 35px 80px rgba(0,0,0,.25)",
                },
              }}
            >
              <Grid
                container
                direction={index % 2 === 0 ? "row" : "row-reverse"}
              >
                {/* CONTENT */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    p: { xs: 4, md: 6 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "3rem",
                      fontWeight: 900,
                      color: "#0A9396",
                      mb: 1,
                      lineHeight: 1,
                    }}
                  >
                    {`0${index + 1}`}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#0A9396",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      mb: 2,
                    }}
                  >
                    {section.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        md: "2.8rem",
                      },
                      fontWeight: 800,
                      color: "#102A43",
                      lineHeight: 1.2,
                      mb: 2,
                    }}
                  >
                    {section.highlight}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#486581",
                      lineHeight: 1.9,
                      fontSize: "1.05rem",
                      mb: 4,
                    }}
                  >
                    {section.description}
                  </Typography>

                  <Stack spacing={2}>
                    {section.bullets.map((bullet) => (
                      <Box
                        key={bullet}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <CheckCircleOutlineOutlinedIcon
                          sx={{
                            color: "#0A9396",
                          }}
                        />

                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "#102A43",
                          }}
                        >
                          {bullet}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Button
                    variant="text"
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={() => navigate(section.route)}
                    sx={{
                      mt: 4,
                      width: "fit-content",
                      color: "#0A9396",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    Explore Feature
                  </Button>
                </Grid>

                {/* IMAGE */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: { xs: 4, md: 5 },
                    background:
                      "linear-gradient(135deg, rgba(10,147,150,0.08), rgba(56,178,172,0.15))",
                  }}
                >
                  <Box
                    component="img"
                    src={section.image}
                    alt={section.title}
                    sx={{
                      width: "100%",
                      maxWidth: 500,
                      transition: ".4s",
                      filter:
                        "drop-shadow(0 25px 45px rgba(0,0,0,.18))",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>

        {/* CTA */}
        <Paper
          elevation={0}
          sx={{
            mt: 8,
            p: { xs: 4, md: 6 },
            borderRadius: 6,
            textAlign: "center",
            background:
              "linear-gradient(135deg,#0A9396 0%,#38B2AC 100%)",
            color: "#fff",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
              fontWeight: 800,
              mb: 2,
            }}
          >
            Ready to Start Learning?
          </Typography>

          <Typography
            sx={{
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.8,
              opacity: 0.95,
              mb: 4,
            }}
          >
            Unlock OCR extraction, diagram intelligence,
            micro-learning capsules, and engaging quizzes
            in one seamless platform.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/signup")}
            sx={{
              bgcolor: "#fff",
              color: "#0A9396",
              fontWeight: 800,
              px: 5,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
          >
            Get Started
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default FeaturesPage;