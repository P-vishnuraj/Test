# My Habit Tracker - Mobile Installation Guide

## For Android 11+ Devices

### Method 1: Install as PWA (Recommended - Easiest)

1. **Open in Chrome/Edge Browser**
   - Navigate to your habit tracker URL
   - Chrome will automatically show "Add to Home Screen" prompt

2. **Manual Installation**
   - Tap the 3-dot menu (⋮) in Chrome
   - Select "Add to Home Screen" or "Install app"
   - Give it a name (e.g., "My Habits")
   - Tap "Add"

3. **Features**
   - Works offline after first load
   - Appears like a native app
   - No app store needed
   - Auto-updates when online
   - Full screen mode
   - Access from home screen

### Method 2: Create APK using PWABuilder (Advanced)

If you need a distributable APK file:

1. **Visit PWABuilder**
   - Go to https://www.pwabuilder.com/
   - Enter your app URL
   - Click "Start"

2. **Generate APK**
   - Click on "Android" package
   - Configure app details
   - Download the APK file

3. **Install APK**
   - Transfer APK to Android device
   - Enable "Install from Unknown Sources"
   - Install the APK

### Method 3: Using Capacitor (For Developer Distribution)

To create a production APK:

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# Initialize Capacitor
npx cap init

# Build React app
npm run build

# Add Android platform
npx cap add android

# Copy web assets
npx cap copy

# Open in Android Studio
npx cap open android

# Build APK in Android Studio:
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

## Current App Features

✅ **Template-Based Organization**
- Multiple habit templates (Daily, Office, etc.)
- Daily completion tracking with progress bars
- Each template resets daily

✅ **Smart Tracking**
- Streak counter for consistency
- Notes for each habit (e.g., book names)
- Time-of-day categorization
- Category filters

✅ **Security**
- 4-digit PIN lock
- All data stored locally

✅ **Mobile Optimized**
- Responsive design
- Touch-friendly buttons
- Works offline
- PWA installable

## Tech Stack
- Frontend: React + TailwindCSS + Shadcn/ui
- State: localStorage (currently)
- PWA: Service Worker enabled
- Icons: Lucide React
