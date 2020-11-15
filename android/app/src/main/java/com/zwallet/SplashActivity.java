package com.zwallet;

import android.content.Intent;
import android.os.Bundle;

// import android.support.v7.app.AppCompatActivity; <- dari net guru di ganti, jadi dibawah
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}