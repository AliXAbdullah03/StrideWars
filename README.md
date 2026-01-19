# StrideWars Mobile App

A React Native mobile application built with Expo.

## Prerequisites

Before you start, make sure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Expo CLI** (will be installed globally)
   - Install with: `npm install -g expo-cli`

4. **Expo Go App** (on your mobile device)
   - **iOS**: Download from App Store
   - **Android**: Download from Google Play Store

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

3. **View on your device:**
   - Open the Expo Go app on your phone
   - Scan the QR code that appears in your terminal/browser
   - Your app will load on your device with live reloading!

## Development

- Edit `App.js` to see changes in real-time
- The app will automatically reload when you save changes
- Shake your device to open the developer menu

## Project Structure

```
StrideWars/
├── App.js              # Main app component
├── app.json            # Expo configuration
├── package.json        # Dependencies
├── babel.config.js     # Babel configuration
└── assets/             # Images and other assets
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android device/emulator
- `npm run ios` - Start on iOS device/simulator
- `npm run web` - Start in web browser

## Troubleshooting

- If you see connection issues, make sure your phone and computer are on the same WiFi network
- For Android, you may need to enable USB debugging if using a physical device
- Clear cache: `expo start -c`
