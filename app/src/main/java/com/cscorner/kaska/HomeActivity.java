package com.cscorner.kaska;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

public class HomeActivity extends AppCompatActivity {

    private ImageView kaskaLogo;
    private ImageView ocrButton;
    private ImageView drawIcon; // New draw icon

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        // Kaska logo -> UploadDocumentsActivity
        kaskaLogo = findViewById(R.id.kaskaLogo);
        kaskaLogo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this, UploadDocumentsActivity.class);
                startActivity(intent);
            }
        });

        // OCR Button -> ImageOCRActivity
        ocrButton = findViewById(R.id.ocrButton);
        ocrButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this, ImageOCRActivity.class);
                startActivity(intent);
            }
        });

        // Draw Icon -> DrawingActivity
        drawIcon = findViewById(R.id.drawIcon); // Ensure this ID exists in XML
        drawIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this, DrawingActivity.class);
                startActivity(intent);
            }
        });
    }
}
