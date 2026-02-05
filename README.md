# Thomino's playground
Get full Expo app templates on https://www.native-templates.com

<a href="https://www.native-templates.com" target="_blank">
  <img src="assets/img/readme/readme.jpg" alt="Get full Expo apps on www.native-templates.com" />
</a>



## Getting Started
Just playing with react native and expo. Feel free to use anything anywhere

```bash
# Use Node.js v20
nvm use 20

# Install dependencies
npm install --legacy-peer-deps

# Start the Expo development server with a clean cache
npx expo start -c
```

## Development Build Required

This project uses native modules that are **not available in Expo Go**:
- `@shopify/react-native-skia` - 2D graphics and charts

You need to create a **development build** to run the app:

```bash
# Generate native projects
npx expo prebuild --clean

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android

```

After the first build, you can use `npx expo start --dev-client` to connect to your development build.


## License

MIT 