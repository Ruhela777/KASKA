# Kaska Android Project — Analysis

## 1. App purpose
- Kaska is a learning/utility app combining quick OCR (image -> text), diagram recognition, micro-learning, quizzes, drawing/canvas tools, and document upload/export features. It provides Google sign-in and a simple navigation flow between onboarding, content, and utility screens.

## 2. Screens (layouts)
The project contains the following layout files (activity screens):
- `res/layout/activity_main.xml` — tappable entry screen that launches OCR flow.
- `res/layout/activity_welcome.xml` — welcome screen with Login / SignUp.
- `res/layout/activity_login.xml` — login screen with Google sign-in.
- `res/layout/activity_sign_up.xml` — signup placeholder screen.
- `res/layout/activity_home.xml` — home/dashboard with shortcuts (OCR, upload, drawing).
- `res/layout/activity_image_ocractivity.xml` — pick/upload image for OCR.
- `res/layout/activity_ocractivity.xml` — OCR flow screen (intro/next/skip).
- `res/layout/activity_ocrresult.xml` — shows extracted text; save-to-PDF and print.
- `res/layout/activity_diagram_recognition.xml` — diagram recognition step.
- `res/layout/activity_micro_learning.xml` — micro-learning module screen.
- `res/layout/activity_quiz_splash.xml` — quiz intro / splash.
- `res/layout/activity_upload_documents.xml` — upload documents placeholder.
- `res/layout/activity_drawing.xml` — drawing/canvas screen.
- `res/layout/activity_google_sign_in.xml` — Google Sign-In UI.

## 3. Activities
List of Activity classes (primary behavior):
- `MainActivity` — launcher; edge-to-edge layout; tap -> `OCRActivity`.
- `WelcomeActivity` — onboarding offering Login / SignUp.
- `LoginActivity` — Google Sign-In flow (uses `GoogleSignInClient`); transfers user data to `HomeActivity`.
- `SignUpActivity` — UI for sign-up (no auth implementation yet).
- `GoogleSignInActivity` — alternate Google Sign-In implementation; navigates to `HomeActivity` on success.
- `HomeActivity` — dashboard linking to `UploadDocumentsActivity`, `ImageOCRActivity`, `DrawingActivity`.
- `ImageOCRActivity` — image picker, local file creation, image upload to OCR server, parses JSON response and opens `OCRResultActivity` with extracted text.
- `OCRActivity` — OCR flow step; navigates to `DiagramRecognitionActivity` or skips to `WelcomeActivity`.
- `DiagramRecognitionActivity` — navigates to `MicroLearningActivity` or skip to `WelcomeActivity`.
- `MicroLearningActivity` — navigates to `QuizSplashActivity`.
- `QuizSplashActivity` — finalizes quiz flow and returns to `WelcomeActivity`.
- `OCRResultActivity` — displays extracted text, offers save-to-PDF and printing via `PDFPrintAdapter`.
- `UploadDocumentsActivity` — placeholder screen for document upload.
- `DrawingActivity` — hosts `DrawingView` canvas with color and clear controls.

There are no classes extending Fragment found in the codebase (UI is activity-based).

## 4. Fragments
- None detected. The app uses Activities for each screen.

## 5. Navigation flow
- App launcher: `MainActivity` (intent-filter MAIN/LAUNCHER in AndroidManifest).
- Typical flows (high-level):
  - Main flow (on tap): `MainActivity` -> `OCRActivity` -> `DiagramRecognitionActivity` -> `MicroLearningActivity` -> `QuizSplashActivity` -> `WelcomeActivity`.
  - Onboarding / auth: `WelcomeActivity` -> `LoginActivity` (or `SignUpActivity`). From `LoginActivity` successful Google sign-in -> `HomeActivity`.
  - Home shortcuts: `HomeActivity` -> `UploadDocumentsActivity` | `ImageOCRActivity` | `DrawingActivity`.
  - OCR result: `ImageOCRActivity` uploads an image to an external OCR endpoint, receives JSON `{ "text": "..." }` and opens `OCRResultActivity` with `extractedText` extra.

Note: There are multiple entry points for sign-in (`LoginActivity`, `GoogleSignInActivity`), but the manifest's launcher is `MainActivity`.

## 6. API integrations
- OkHttp (`com.squareup.okhttp3:okhttp:4.12.0`) is used to upload images to an external OCR server. The URL is currently hard-coded in `ImageOCRActivity`:
  - Example endpoint in code: `https://13b6-45-248-160-62.ngrok-free.app/upload` (ngrok tunnelling to a local/remote OCR service).
- JSON parsing is done with `org.json` (manually) in `ImageOCRActivity`.
- Glide (`com.github.bumptech.glide:glide:4.12.0`) is included for image loading/caching (present in dependencies, used from layouts/activities where needed).

## 7. Firebase integrations
- Project contains `google-services.json` with Firebase project: `project_id: kaska-ee316` and API key present; `storage_bucket: kaska-ee316.firebasestorage.app`.
- `app/build.gradle.kts` includes `com.google.firebase:firebase-auth:22.2.0` and plugin `com.google.gms.google-services`.
- Despite the Firebase Auth library being declared, there is no explicit `FirebaseAuth` usage in application source code — authentication is implemented via Google Sign-In using `GoogleSignInClient` (Play Services). Firebase services such as Firestore/Realtime Database/Storage are not used in the app source.

## 8. Database structure
- No local database usage detected (no Room / SQLite helper classes). No Firestore / Realtime Database usage detected in source.
- App appears to rely on remote service(s) for OCR and uses local file storage when generating PDFs (`Environment.DIRECTORY_DOCUMENTS`) and cache for temporary files.

## 9. Business logic
- Authentication: Google Sign-In is implemented for user sign-in (`LoginActivity`, `GoogleSignInActivity`). Firebase Auth dependency exists but is not wired into the code; `GoogleSignInAccount` data is passed into `HomeActivity` via Intent extras.
- OCR: User selects an image in `ImageOCRActivity`; app converts `Uri` -> File, then uploads as multipart form data to an OCR HTTP endpoint using OkHttp. Server response expected as JSON with `text` field; that text is displayed in `OCRResultActivity`.
- OCR result handling: `OCRResultActivity` sets text into an `EditText`, allows saving as PDF (uses `PdfDocument` API) and printing via a `PDFPrintAdapter` which streams a temp PDF to the Android print manager.
- Drawing: `DrawingActivity` manages a `DrawingView` (custom view) with color selection and canvas clearing.
- Navigation & UX: The app primarily navigates between Activities (explicit intents). Many screens currently act as placeholders or navigation steps (e.g., `UploadDocumentsActivity`, `SignUpActivity`) suggesting incomplete features.

## Permissions
- Declared in `AndroidManifest.xml`:
  - `android.permission.INTERNET`
  - `android.permission.WRITE_EXTERNAL_STORAGE` (with maxSdkVersion=28)
  - `android.permission.READ_EXTERNAL_STORAGE`

## Notable files to review
- [app/src/main/AndroidManifest.xml](app/src/main/AndroidManifest.xml)
- [app/build.gradle.kts](app/build.gradle.kts)
- [app/google-services.json](app/google-services.json)
- Important activities (sources):
  - [app/src/main/java/com/cscorner/kaska/MainActivity.java](app/src/main/java/com/cscorner/kaska/MainActivity.java)
  - [app/src/main/java/com/cscorner/kaska/WelcomeActivity.java](app/src/main/java/com/cscorner/kaska/WelcomeActivity.java)
  - [app/src/main/java/com/cscorner/kaska/LoginActivity.java](app/src/main/java/com/cscorner/kaska/LoginActivity.java)
  - [app/src/main/java/com/cscorner/kaska/HomeActivity.java](app/src/main/java/com/cscorner/kaska/HomeActivity.java)
  - [app/src/main/java/com/cscorner/kaska/ImageOCRActivity.java](app/src/main/java/com/cscorner/kaska/ImageOCRActivity.java)
  - [app/src/main/java/com/cscorner/kaska/OCRResultActivity.java](app/src/main/java/com/cscorner/kaska/OCRResultActivity.java)

## Recommendations / Next steps
- Remove unused Firebase dependencies or integrate `FirebaseAuth` properly if Firebase-backed authentication is desired.
- Move hard-coded OCR endpoint to a configuration file or BuildConfig field; add error handling retry/backoff.
- Document data flow for user files (PDFs) and consider using `Scoped Storage` compatible APIs for Android 11+.
- Implement (or remove placeholder) email/password sign-up and `UploadDocumentsActivity` features.
- Add unit / integration tests for the OCR upload and PDF generation logic.

---
Generated on: 2026-06-07
