package com.cscorner.kaska;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.pdf.PdfDocument;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import android.print.PrintManager;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;

public class OCRResultActivity extends AppCompatActivity {

    private EditText editTextExtracted;
    private Button savePdfButton, printButton;

    private static final int REQUEST_CODE_STORAGE = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ocrresult);

        editTextExtracted = findViewById(R.id.editTextExtracted);
        savePdfButton = findViewById(R.id.savePdfButton);
        printButton = findViewById(R.id.printButton);

        String result = getIntent().getStringExtra("extractedText");
        editTextExtracted.setText((result != null && !result.isEmpty()) ? result : "No text extracted.");

        savePdfButton.setOnClickListener(v -> {
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q && !checkPermission()) {
                requestPermission();
            } else {
                createPdf(editTextExtracted.getText().toString());
            }
        });

        printButton.setOnClickListener(v -> printDocument(editTextExtracted.getText().toString()));
    }

    private void createPdf(String textContent) {
        PdfDocument document = new PdfDocument();
        PdfDocument.PageInfo pageInfo = new PdfDocument.PageInfo.Builder(595, 842, 1).create(); // A4
        PdfDocument.Page page = document.startPage(pageInfo);

        Canvas canvas = page.getCanvas();
        Paint paint = new Paint();
        paint.setTextSize(12);
        int x = 10, y = 25;

        for (String line : textContent.split("\n")) {
            canvas.drawText(line, x, y, paint);
            y += 20;
        }

        document.finishPage(page);

        String fileName = "OCR_Extracted_Text_" + System.currentTimeMillis() + ".pdf";
        File dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS);
        File file = new File(dir, fileName);

        try {
            if (!dir.exists()) dir.mkdirs();
            FileOutputStream out = new FileOutputStream(file);
            document.writeTo(out);
            out.close();
            Toast.makeText(this, "PDF saved to Documents", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            Toast.makeText(this, "Error saving PDF: " + e.getMessage(), Toast.LENGTH_LONG).show();
        }

        document.close();
    }

    private void printDocument(String textContent) {
        try {
            File pdfFile = File.createTempFile("temp_ocr", ".pdf", getCacheDir());

            PdfDocument document = new PdfDocument();
            PdfDocument.PageInfo pageInfo = new PdfDocument.PageInfo.Builder(595, 842, 1).create();
            PdfDocument.Page page = document.startPage(pageInfo);
            Canvas canvas = page.getCanvas();
            Paint paint = new Paint();
            paint.setTextSize(12);
            int x = 10, y = 25;

            for (String line : textContent.split("\n")) {
                canvas.drawText(line, x, y, paint);
                y += 20;
            }

            document.finishPage(page);
            FileOutputStream outputStream = new FileOutputStream(pdfFile);
            document.writeTo(outputStream);
            document.close();
            outputStream.close();

            PrintManager printManager = (PrintManager) getSystemService(Context.PRINT_SERVICE);
            PrintDocumentAdapter printAdapter = new PDFPrintAdapter(pdfFile);
            printManager.print("OCR_Text_Print", printAdapter, new PrintAttributes.Builder().build());

        } catch (IOException e) {
            Toast.makeText(this, "Error printing: " + e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

    private boolean checkPermission() {
        return ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) ==
                PackageManager.PERMISSION_GRANTED;
    }

    private void requestPermission() {
        ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, REQUEST_CODE_STORAGE);
    }
}
