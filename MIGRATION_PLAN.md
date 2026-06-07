# Migration Plan — Android Java -> React Website

**Summary:** This document maps the existing Android Activities and screens to a React website structure, identifies reusable UI components, and proposes a folder layout and migration steps. Implement one page/component at a time and test routes and services incrementally.

**1. All screens (from the Android project)**
- `MainActivity` (activity_main)
- `WelcomeActivity` (activity_welcome)
- `LoginActivity` (activity_login)
- `SignUpActivity` (activity_sign_up)
- `GoogleSignInActivity` (activity_google_sign_in)
- `HomeActivity` (activity_home)
- `ImageOCRActivity` (activity_image_ocractivity)
- `OCRActivity` (activity_ocractivity)
- `OCRResultActivity` (activity_ocrresult)
- `DiagramRecognitionActivity` (activity_diagram_recognition)
- `MicroLearningActivity` (activity_micro_learning)
- `QuizSplashActivity` (activity_quiz_splash)
- `UploadDocumentsActivity` (activity_upload_documents)
- `DrawingActivity` (activity_drawing)

**2. Map Activities -> React Pages (routes)**
- `/` -> `MainPage` (from `MainActivity`) — landing tappable entry.
- `/welcome` -> `WelcomePage` (`WelcomeActivity`).
- `/login` -> `LoginPage` (`LoginActivity` + `GoogleSignInActivity` merged).
- `/signup` -> `SignUpPage` (`SignUpActivity`).
- `/home` -> `HomePage` (`HomeActivity`).
- `/ocr` -> `OcrIntroPage` (`OCRActivity`).
- `/ocr/upload` -> `ImageOcrPage` (`ImageOCRActivity`) — image picker + upload.
- `/ocr/result` -> `OcrResultPage` (`OCRResultActivity`).
- `/diagram` -> `DiagramRecognitionPage` (`DiagramRecognitionActivity`).
- `/learning` -> `MicroLearningPage` (`MicroLearningActivity`).
- `/quiz` -> `QuizSplashPage` (`QuizSplashActivity`).
- `/upload` -> `UploadDocumentsPage` (`UploadDocumentsActivity`).
- `/drawing` -> `DrawingPage` (`DrawingActivity`).

Notes:
- `GoogleSignInActivity` functionality should be integrated into `LoginPage` (single sign-in flow).
- `MainPage` can redirect to `/ocr` or `/welcome` depending on UX decisions.

**3. Map Fragments -> React Components**
- No `Fragment` classes found in the Android project. The UI is activity-based. Treat activity sub-sections and repeated UI pieces as components.

**4. Reusable UI components (suggested)**
- `Header` / `TopBar` — app title, profile badge, nav links.
- `Footer` — copyright / small links.
- `NavBar` / `SideNav` — main navigation between pages.
- `Button` — standardized button styles.
- `IconButton` — image/icon buttons (e.g., OCR, drawing icons).
- `ImageUploader` — file picker + preview (used by `ImageOcrPage` and `UploadDocumentsPage`).
- `OcrResultViewer` — read-only text viewer with copy/export actions.
- `PdfExportButton` — triggers client-side PDF generation and download (jsPDF) or server request.
- `DrawingCanvas` — React wrapper for the drawing view (uses HTML5 canvas).
- `AuthProvider` (context) — authentication state and helpers.
- `ProtectedRoute` — route guard for authenticated pages.
- `LoadingSpinner` / `Toast` — UX helpers for progress and messages.

**5. Services (non-UI) to implement**
- `services/ocrService.js` — `uploadImage(file)` -> POST multipart -> returns extracted text.
- `services/authService.js` — Google OAuth / Firebase Auth wrappers.
- `services/pdfService.js` — client PDF creation (jsPDF) or server-side export wrapper.
- `services/storageService.js` — optional: upload saved PDFs to cloud storage (Firebase Storage or S3).

**6. Data & State mapping (business logic)**
- `GoogleSignInAccount` -> store user profile in `AuthProvider` (`name`, `email`, `photoUrl`).
- OCR flow: `ImageOcrPage` -> call `ocrService.uploadImage()` -> on success push `extractedText` to `OcrResultPage` via navigation state or URL state (use Context or localStorage for larger payloads).
- PDF creation: `OcrResultPage` uses `pdfService` to create and download file; printing via `window.print()` or browser print API.

**7. Proposed React folder structure**
```
project-root/
├─ public/
│  └─ index.html
├─ src/
│  ├─ assets/                # images, icons
│  ├─ components/            # reusable UI components
│  │  ├─ Header/
│  │  ├─ Footer/
│  │  ├─ ImageUploader/
│  │  ├─ OcrResultViewer/
│  │  └─ DrawingCanvas/
│  ├─ pages/                 # page-level components (mapped from Activities)
│  │  ├─ MainPage/
│  │  ├─ WelcomePage/
│  │  ├─ LoginPage/
│  │  ├─ SignUpPage/
│  │  ├─ HomePage/
│  │  ├─ ImageOcrPage/
│  │  ├─ OcrResultPage/
│  │  ├─ DiagramRecognitionPage/
│  │  ├─ MicroLearningPage/
│  │  ├─ QuizSplashPage/
│  │  ├─ UploadDocumentsPage/
│  │  └─ DrawingPage/
│  ├─ services/              # API wrappers (ocrService, authService, pdfService)
│  ├─ hooks/                 # custom hooks (useAuth, useOcr)
│  ├─ contexts/              # React contexts (AuthProvider)
│  ├─ utils/                 # utility helpers
│  ├─ styles/                # global CSS / theme
│  └─ index.js
├─ package.json
└─ README.md
```

**8. Migration steps (high level)**
1. Scaffold React app (Vite or Create React App). Install: `react`, `react-router-dom`, `axios`, `jsPDF` (optional), `firebase` (optional), `react-hook-form` (optional).
2. Implement `AuthProvider` and `LoginPage` using Google OAuth or Firebase Auth.
3. Build core pages: `ImageOcrPage`, `OcrResultPage`, and `HomePage` with navigation.
4. Implement `ImageUploader` and `ocrService.uploadImage()` to call the existing OCR endpoint; adapt to server API.
5. Implement `PdfExportButton` (jsPDF) and `DrawingCanvas` (HTML5 canvas).
6. Wire routing (`react-router-dom`) and `ProtectedRoute` for authenticated pages.
7. Replace Android file handling with browser file APIs (FileReader, FormData, download links).
8. Test flows end-to-end, add error handling and retries for OCR uploads.

**9. Notes & recommendations**
- Move the ngrok URL out of code; use environment variables (e.g., `VITE_OCR_URL` or `.env`).
- For sign-in, prefer OAuth client on web or Firebase Web SDK to keep a unified auth API.
- For PDF printing, `jsPDF` is a good client-side option; for larger PDFs consider server-side generation.
- Use client-side routing and local state (Context) for small extracted-text payloads; for larger content consider short-lived server storage or compressing data.

---
Generated: 2026-06-07
