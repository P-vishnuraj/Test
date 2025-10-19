"# Quick APK Creation Guide

## Using PWABuilder (Easiest APK Method)

### Step 1: Get Your App URL
Your app is running at the URL provided by Emergent (e.g., https://your-app.emergent.sh)

### Step 2: Visit PWABuilder
1. Go to: https://www.pwabuilder.com/
2. Enter your app URL in the input box
3. Click \"Start\"

### Step 3: Generate Android Package
1. Wait for the analysis to complete
2. Click on the \"Android\" tab/button
3. Choose \"Google Play Store\" option
4. Click \"Generate Package\"
5. Download the APK file

### Step 4: Install on Your Phone
1. Transfer the downloaded APK to your phone (via USB, email, or cloud)
2. On your phone, go to Settings → Security → Enable \"Install from Unknown Sources\"
3. Open the APK file using File Manager
4. Tap \"Install\"
5. Done!

## Alternative: Using Your Computer

If you have Node.js installed on your computer:

```bash
# Clone/download your project files
cd /path/to/habit-tracker

# Install dependencies
cd frontend
yarn install

# Build production version
yarn build

# Install Capacitor
yarn add @capacitor/core @capacitor/cli @capacitor/android

# Initialize Capacitor
npx cap init \"My Habit Tracker\" \"com.myhabits.app\" --web-dir=build

# Add Android platform
npx cap add android

# Copy web assets
npx cap copy android

# Open in Android Studio (if installed)
npx cap open android
```

Then in Android Studio:
- Build → Build Bundle(s) / APK(s) → Build APK(s)
- Find APK in: `android/app/build/outputs/apk/debug/app-debug.apk`

## Notes
- PWABuilder is the easiest method (no coding required)
- The APK will be unsigned (for personal use only)
- For Play Store distribution, you need signed APK
"
