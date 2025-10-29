# AscendiMed

A React Native mobile application built with Expo.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (iOS/Android) or iOS Simulator / Android Emulator

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the App

### Start the development server:
```bash
npm start
```

### Run on specific platforms:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
AscendiMed/
├── App.js                 # Main app entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── babel.config.js       # Babel configuration
└── src/
    └── screens/
        └── HomeScreen.js # Home screen component
```

## Features

- React Navigation for navigation
- Safe Area Context for proper screen handling
- Modern UI with Material Design colors
- Expo Status Bar integration

## Development

The app uses Expo SDK 54 and React Native 0.74.5.

## Troubleshooting

**If `expo` command is not recognized:**
- Use `npm start` instead of `expo start`
- Or use `npx expo start` directly
- The npm scripts already handle this automatically

