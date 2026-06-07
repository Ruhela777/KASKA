package com.cscorner.kaska;

import android.graphics.Color;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageButton;
import androidx.appcompat.app.AppCompatActivity;

public class DrawingActivity extends AppCompatActivity {

    private DrawingView drawingView;
    private ImageButton blackBtn, redBtn, blueBtn, greenBtn;
    private Button clearBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_drawing);

        drawingView = findViewById(R.id.drawing_view);

        blackBtn = findViewById(R.id.black_btn);
        redBtn = findViewById(R.id.red_btn);
        blueBtn = findViewById(R.id.blue_btn);
        greenBtn = findViewById(R.id.green_btn);
        clearBtn = findViewById(R.id.clear_btn); // Now correctly cast as Button

        blackBtn.setOnClickListener(v -> drawingView.setPaintColor(Color.BLACK));
        redBtn.setOnClickListener(v -> drawingView.setPaintColor(Color.RED));
        blueBtn.setOnClickListener(v -> drawingView.setPaintColor(Color.BLUE));
        greenBtn.setOnClickListener(v -> drawingView.setPaintColor(Color.GREEN));
        clearBtn.setOnClickListener(v -> drawingView.clearCanvas());
    }
}
