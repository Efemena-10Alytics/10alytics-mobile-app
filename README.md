# 10alytics Learning Management Mobile App

A modern, gamified learning management mobile app built with Expo, React Native, and Better Auth.

## Features

✨ **Authentication**
- Email and password sign-in/sign-up
- Google OAuth integration
- Secure session management

📚 **Course Management**
- Course progress tracking with visual indicators
- Achievement badges and gamification
- Learning streaks
- Course completion percentages

🎥 **Video Library**
- Categorized video content
- Progress tracking per video
- Watch status indicators
- Duration and view statistics

📅 **Event Calendar**
- Today's events display
- Upcoming events
- Event details (time, location, attendees)
- Interactive calendar navigation

💬 **Group Chat**
- Study group management
- Real-time messaging interface
- Unread message indicators
- Group member counts

👤 **Profile**
- User statistics dashboard
- Achievement showcase
- Settings access
- Account management

## Tech Stack

- **Framework**: Expo (React Native)
- **Navigation**: Expo Router
- **Authentication**: Laravel API (JWT/Sanctum)
- **Styling**: NativeWind (Tailwind CSS)
- **Animations**: React Native Reanimated
- **State Management**: Zustand
- **Icons**: Expo Vector Icons

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Expo CLI
- A Laravel API backend server

### Installation

1. Install dependencies:
```bash
bun install
# or
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Laravel API URL:
```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api
```

3. Start the development server:
```bash
bun start
# or
npm start
```

### Backend Setup

This app requires a Laravel API backend. See [LARAVEL_API_SETUP.md](./LARAVEL_API_SETUP.md) for detailed backend setup instructions.

## Project Structure

```
src/
├── app/
│   ├── (tabs)/              # Main app screens
│   │   ├── index.tsx        # Courses/Home
│   │   ├── videos.tsx       # Video library
│   │   ├── calendar.tsx     # Event calendar
│   │   ├── chat.tsx         # Group chat
│   │   └── profile.tsx      # User profile
│   ├── sign-in.tsx          # Sign in screen
│   ├── create-account.tsx   # Sign up screen
│   └── onboarding/          # Onboarding flow
├── components/
│   └── gamification/        # Gamification components
├── lib/
│   └── auth-client.ts       # Better Auth client
└── utils/
    └── auth-store.tsx       # Auth state management
```

## Design

- **Primary Color**: #DA6728 (Orange)
- **Animations**: Smooth fade-in and spring animations throughout
- **Gamification**: Progress rings, achievement badges, streak counters
- **UI/UX**: Modern, clean interface with gradient headers

## Development

### Running on Different Platforms

- **iOS Simulator**: Press `i` in the Expo CLI
- **Android Emulator**: Press `a` in the Expo CLI
- **Physical Device**: Scan QR code with Expo Go app

### Building for Production

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## Documentation

For detailed setup instructions, including backend configuration, see [SETUP.md](./SETUP.md).

## License

Private project
