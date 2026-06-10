import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, googleProvider, db } from "../firebase/firebase";
import kaskaLogoSmall from "../assets/kaska_logo_small.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Session observer updated to forward active users directly to the Upload Documents workspace
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/upload");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      localStorage.setItem(
        "kaska_user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
        })
      );

      navigate("/upload"); // Route updated from /home to /upload
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found");
          break;

        case "auth/wrong-password":
          setError("Incorrect password");
          break;

        case "auth/invalid-credential":
          setError("Invalid email or password");
          break;

        default:
          setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      localStorage.setItem(
        "kaska_user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        })
      );

      navigate("/upload"); // Route updated from /home to /upload
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // Fluid dark color system matching Features/Upload styling
        background: `linear-gradient(-45deg, #0077B6, #0496C7, #06283D, #16213E, #0f172a)`,
        backgroundSize: "400% 400%",
        animation: "fluidBackground 15s ease infinite",
        backgroundAttachment: "fixed",
        overflowX: "hidden",
        px: 2,

        "@keyframes fluidBackground": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      {/* BRAND HEADER LINK */}
      <Box
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: { xs: 24, md: 32 },
          left: { xs: 24, md: 40 },
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <Box
          component="img"
          src={kaskaLogoSmall}
          alt="Kaska Logo"
          sx={{ width: 36, height: 36, objectFit: "contain" }}
        />
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.15rem",
            letterSpacing: "0.1em",
          }}
        >
          KASKA
        </Typography>
      </Box>

      {/* SYMMETRICAL GLASS SURFACE PANEL */}
      <Container maxWidth="xs" sx={{ zIndex: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 5,
            bgcolor: "rgba(6, 40, 61, 0.45)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "2px solid rgba(4, 150, 199, 0.35)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(209, 234, 240, 0.15)",
              border: "1.5px solid rgba(209, 234, 240, 0.4)",
              color: "#D1EAF0",
              mb: 2,
              width: 50,
              height: 50,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: "1.6rem" }} />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: 900,
              color: "#ffffff",
              mb: 0.5,
              letterSpacing: "-0.02em",
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.65)", mb: 4 }}
          >
            Login to continue to your workspace
          </Typography>

          {error && (
            <Alert
              severity="error"
              variant="filled"
              sx={{ width: "100%", mb: 3, borderRadius: 2, bgcolor: "#d32f2f" }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              severity="success"
              variant="filled"
              sx={{ width: "100%", mb: 3, borderRadius: 2, bgcolor: "#2e7d32" }}
            >
              {success}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleEmailLogin}
            sx={{ width: "100%" }}
          >
            <TextField
              fullWidth
              label="Email"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiFilledInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.08)" },
                  "&.Mui-focused": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.5)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#D1EAF0" },
              }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiFilledInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.08)" },
                  "&.Mui-focused": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.5)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#D1EAF0" },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.4,
                borderRadius: 2,
                bgcolor: "#D1EAF0",
                color: "#0077B6",
                fontWeight: 800,
                textTransform: "none",
                fontSize: "0.95rem",
                boxShadow: "0 4px 15px rgba(209, 234, 240, 0.2)",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#ffffff",
                  transform: "translateY(-1px)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: "#0077B6" }} />
              ) : (
                "Login"
              )}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{
                mt: 2,
                py: 1.3,
                borderRadius: 2,
                color: "#ffffff",
                borderColor: "rgba(255, 255, 255, 0.3)",
                textTransform: "none",
                fontWeight: 600,
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "#ffffff",
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              Sign in with Google
            </Button>

            <Grid container sx={{ mt: 3.5, justifyContent: "space-between" }}>
              <Grid item>
                <Link
                  component="button"
                  type="button"
                  onClick={handleForgotPassword}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.82rem",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": { color: "#D1EAF0" },
                  }}
                >
                  Forgot Password?
                </Link>
              </Grid>

              <Grid item>
                <Link
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    color: "#D1EAF0",
                    fontSize: "0.82rem",
                    textDecoration: "none",
                    fontWeight: 700,
                    "&:hover": { color: "#ffffff" },
                  }}
                >
                  Create Account
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;