import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import UploadDocumentsPage from "../pages/UploadDocumentsPage";
import OCRPage from "../pages/features";
import OCRResultPage from "../pages/OCRResultPage";
import DrawingPage from "../pages/DrawingPage";
import QuizPage from "../pages/QuizPage";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/upload" element={<UploadDocumentsPage />} />
      <Route path="/ocr" element={<OCRPage />} />
      <Route path="/result" element={<OCRResultPage />} />
      <Route path="/drawing" element={<DrawingPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;