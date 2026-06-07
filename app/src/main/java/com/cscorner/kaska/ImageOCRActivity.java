package com.cscorner.kaska;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.OpenableColumns;
import android.util.Log;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ImageOCRActivity extends AppCompatActivity {

    private static final int PICK_IMAGE_REQUEST = 1;
    private static final int REQUEST_PERMISSION = 100;

    private ImageView imageView;
    private Uri imageUri;

    // Update this with your ngrok or server URL
    private final String OCR_URL =
            "https://13b6-45-248-160-62.ngrok-free.app/upload";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_ocractivity);

        imageView = findViewById(R.id.imageView);
        Button selectImageButton = findViewById(R.id.selectImageButton);
        Button uploadButton = findViewById(R.id.uploadButton);

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                    REQUEST_PERMISSION);
        }

        selectImageButton.setOnClickListener(v -> openGallery());

        uploadButton.setOnClickListener(v -> {
            if (imageUri != null) {
                try {
                    File imageFile = createFileFromUri(imageUri);
                    if (imageFile != null) {
                        uploadImageToServer(imageFile);
                    }
                } catch (IOException e) {
                    Toast.makeText(this, "Error reading file", Toast.LENGTH_SHORT).show();
                    Log.e("OCR_FILE_ERROR", e.toString());
                }
            } else {
                Toast.makeText(this, "Please select an image first", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void openGallery() {
        Intent intent = new Intent(Intent.ACTION_PICK,
                android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(intent, PICK_IMAGE_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK && data != null) {
            imageUri = data.getData();
            imageView.setImageURI(imageUri);
        }
    }

    private File createFileFromUri(Uri uri) throws IOException {
        ContentResolver contentResolver = getContentResolver();
        InputStream inputStream = contentResolver.openInputStream(uri);

        String fileName = getFileName(uri);
        File file = new File(getCacheDir(), fileName);
        FileOutputStream outputStream = new FileOutputStream(file);

        byte[] buffer = new byte[4096];
        int length;

        while ((length = inputStream.read(buffer)) > 0) {
            outputStream.write(buffer, 0, length);
        }

        outputStream.close();
        inputStream.close();
        return file;
    }

    private String getFileName(Uri uri) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            try (Cursor cursor = getContentResolver().query(uri, null, null, null, null)) {
                if (cursor != null && cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndexOrThrow(OpenableColumns.DISPLAY_NAME));
                }
            }
        }
        if (result == null) {
            result = uri.getLastPathSegment();
        }
        return result;
    }

    private void uploadImageToServer(File imageFile) {
        OkHttpClient client = new OkHttpClient();

        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("image", imageFile.getName(),
                        RequestBody.create(imageFile, MediaType.parse("image/*")))
                .build();

        Request request = new Request.Builder()
                .url(OCR_URL)
                .post(requestBody)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                Log.e("OCR_UPLOAD_ERROR", e.toString());
                runOnUiThread(() ->
                        Toast.makeText(ImageOCRActivity.this, "Upload failed: " + e.getMessage(), Toast.LENGTH_LONG).show());
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                if (!response.isSuccessful()) {
                    Log.e("OCR_SERVER_ERROR", "Server error: " + response.message());
                    runOnUiThread(() ->
                            Toast.makeText(ImageOCRActivity.this, "Server error: " + response.message(), Toast.LENGTH_LONG).show());
                    return;
                }

                final String json = response.body().string();
                try {
                    org.json.JSONObject jsonObject = new org.json.JSONObject(json);
                    String extractedText = jsonObject.getString("text");

                    // Launch OCRResultActivity with extracted text
                    runOnUiThread(() -> {
                        Intent intent = new Intent(ImageOCRActivity.this, OCRResultActivity.class);
                        intent.putExtra("extractedText", extractedText);
                        startActivity(intent);
                    });
                } catch (org.json.JSONException e) {
                    Log.e("OCR_JSON_ERROR", e.toString());
                    runOnUiThread(() ->
                            Toast.makeText(ImageOCRActivity.this, "Error parsing server response", Toast.LENGTH_LONG).show());
                }
            }
        });
    }
}
