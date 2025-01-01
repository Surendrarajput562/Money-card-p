package com.yourpackagename;

import android.os.Bundle;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

public class MainActivity extends AppCompatActivity {

    private InterstitialAd mInterstitialAd; // Interstitial Ad variable
    private long lastAdTime = 0; // Last ad shown timestamp
    private final long adInterval = 300000; // Interval between ads in milliseconds (5 minutes)

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize AdMob SDK
        MobileAds.initialize(this, initializationStatus -> {});

        // Load Banner Ad
        AdView adView = findViewById(R.id.adView);
        AdRequest bannerAdRequest = new AdRequest.Builder().build();
        adView.loadAd(bannerAdRequest);

        // Load Interstitial Ad
        loadInterstitialAd();
    }

    private void loadInterstitialAd() {
        AdRequest adRequest = new AdRequest.Builder().build();
        InterstitialAd.load(this, "ca-app-pub-7356424946387381/8766123363", adRequest,
                new InterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(@NonNull InterstitialAd interstitialAd) {
                        mInterstitialAd = interstitialAd;
                    }

                    @Override
                    public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                        mInterstitialAd = null; // Clear the ad if it fails to load
                    }
                });
    }

    // Show Interstitial Ad with timing and user experience management
    private void showInterstitialAd() {
        long currentTime = System.currentTimeMillis();
        if (mInterstitialAd != null && (currentTime - lastAdTime) > adInterval) {
            mInterstitialAd.show(this);
            lastAdTime = currentTime; // Update last ad shown time
        } else {
            Toast.makeText(this, "Ad not ready or already shown recently.", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        // Example: Show Interstitial Ad on resume (you can call showInterstitialAd() at any appropriate place)
        showInterstitialAd();
    }
}