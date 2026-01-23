# Learning Management Mobile App Setup Guide

## Overview

This is a learning management mobile app built with Expo, React Native, and Better Auth. The app features:

- ✅ Email and Google Sign-in authentication
- ✅ Course progress tracking with gamification
- ✅ Video library with progress tracking
- ✅ Event calendar
- ✅ Group chat functionality
- ✅ User profile management
- ✅ Interactive animations and gamification elements
- ✅ Primary color: #DA6728

## Prerequisites

- Node.js 18+ or Bun
- Expo CLI
- A Better Auth backend server (see Backend Setup below)

## Installation

1. Install dependencies:
```bash
bun install
# or
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

**Note:** Update this URL to match your Better Auth backend server URL.

## Backend Setup (Better Auth)

You need to set up a Better Auth backend server. Here's a quick setup:

### 1. Create a backend server (Next.js example)

```bash
# In a separate directory
npx create-next-app@latest better-auth-backend
cd better-auth-backend
npm install better-auth @better-auth/expo
```

### 2. Configure Better Auth server

Create `lib/auth.ts`:
```typescript
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "sqlite", "mysql"
  }),
  plugins: [expo()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: [
    "10alyticsapp://", // Your app scheme
    "http://localhost:8081", // Expo dev server
  ],
});
```

### 3. Create API route

Create `app/api/auth/[...all]/route.ts`:
```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

### 4. Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env` file

### 5. Environment variables for backend

Create `.env` in your backend:
```env
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=your-database-connection-string
```

## Running the App

1. Start the Expo development server:
```bash
bun start
# or
npm start
```

2. Start your Better Auth backend server (in a separate terminal):
```bash
# In your backend directory
npm run dev
```

3. Scan the QR code with Expo Go app or press `i` for iOS simulator / `a` for Android emulator

## App Structure

```
src/
├── app/
│   ├── (tabs)/          # Main app screens (protected routes)
│   │   ├── index.tsx    # Courses/Home screen
│   │   ├── videos.tsx   # Video library
│   │   ├── calendar.tsx # Event calendar
│   │   ├── chat.tsx     # Group chat
│   │   └── profile.tsx  # User profile
│   ├── sign-in.tsx      # Sign in screen
│   ├── create-account.tsx # Sign up screen
│   └── onboarding/      # Onboarding flow
├── components/
│   └── gamification/    # Gamification components
│       ├── progress-ring.tsx
│       ├── achievement-badge.tsx
│       └── streak-counter.tsx
├── lib/
│   └── auth-client.ts   # Better Auth client configuration
└── utils/
    └── auth-store.tsx   # Auth state management
```

## Features

### Authentication
- Email/password sign-in and sign-up
- Google OAuth sign-in
- Secure session management with Better Auth

### Course Progress
- Visual progress tracking with animated progress bars
- Course completion percentages
- Achievement badges
- Learning streaks

### Videos
- Video library with categories
- Progress tracking per video
- Watch status indicators
- Duration and view counts

### Calendar
- Event listings
- Today's events
- Upcoming events
- Event details (time, location, attendees)

### Chat
- Study group management
- Real-time messaging interface
- Unread message indicators
- Group member counts

### Profile
- User statistics
- Achievement showcase
- Settings access
- Sign out functionality

## Customization

### Primary Color
The primary color (#DA6728) is configured in:
- `src/constants/theme.ts`
- `tailwind.config.js`

### Animations
The app uses `react-native-reanimated` for smooth animations. All screens include:
- Fade-in animations
- Spring animations for interactive elements
- Progress animations

### Gamification
Gamification elements include:
- Progress rings
- Achievement badges
- Streak counters
- Points system

## Troubleshooting

### Authentication Issues
- Ensure your Better Auth backend is running
- Check that `EXPO_PUBLIC_BETTER_AUTH_URL` matches your backend URL
- Verify Google OAuth credentials are correct
- Check that your app scheme (`10alyticsapp://`) is in `trustedOrigins`

### Build Issues
- Clear Expo cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && bun install`
- Check that all required packages are installed

## Next Steps

1. Set up your Better Auth backend server
2. Configure Google OAuth credentials
3. Set up your database (PostgreSQL, MySQL, or SQLite)
4. Run database migrations: `npx @better-auth/cli migrate`
5. Update environment variables
6. Start developing!

## Support

For Better Auth documentation, visit: https://www.better-auth.com/docs
