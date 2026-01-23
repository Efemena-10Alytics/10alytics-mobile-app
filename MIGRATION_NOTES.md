# Migration from Better Auth to Laravel API

This document outlines the changes made to migrate from Better Auth to Laravel API authentication.

## Changes Made

### 1. New API Client (`src/lib/api-client.ts`)
- Created a new Laravel API client to replace Better Auth client
- Handles JWT token storage and management
- Implements email/password login and registration
- Implements Google OAuth flow using Expo WebBrowser
- Automatically adds Bearer token to authenticated requests

### 2. Updated Auth Store (`src/utils/auth-store.tsx`)
- Removed Better Auth dependencies
- Now uses Laravel API client for authentication
- Stores user data in Zustand store
- Checks authentication status on app load

### 3. Updated Sign-In Screen (`src/app/sign-in.tsx`)
- Changed from `authClient.signIn.email()` to `apiClient.login()`
- Changed from `authClient.signIn.social()` to `apiClient.googleAuth()`
- Updated error handling to work with Laravel validation errors

### 4. Updated Create Account Screen (`src/app/create-account.tsx`)
- Changed from `authClient.signUp.email()` to `apiClient.register()`
- Changed from `authClient.signIn.social()` to `apiClient.googleAuth()`
- Updated error handling to work with Laravel validation errors

### 5. Updated Profile Screen (`src/app/(tabs)/profile.tsx`)
- Removed `authClient.useSession()` hook
- Now uses `user` from auth store
- Updated sign out to use `apiClient.logout()`

## Removed Dependencies

The following Better Auth dependencies are no longer used but remain in `package.json`:
- `better-auth`
- `@better-auth/expo`

You can remove them if desired:
```bash
bun remove better-auth @better-auth/expo
```

## Environment Variables

Changed from:
```env
EXPO_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

To:
```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api
```

## API Endpoints Required

Your Laravel API must implement these endpoints:

1. **POST** `/api/login` - Email/password login
2. **POST** `/api/register` - Email/password registration
3. **GET** `/api/user` - Get current authenticated user
4. **POST** `/api/logout` - Logout
5. **GET** `/auth/google` - Initiate Google OAuth
6. **GET** `/auth/google/callback` - Handle Google OAuth callback

See [LARAVEL_API_SETUP.md](./LARAVEL_API_SETUP.md) for detailed implementation guide.

## Token Management

- Tokens are stored securely using Expo SecureStore (or localStorage on web)
- Tokens are automatically included in `Authorization: Bearer {token}` header for authenticated requests
- Token is stored after successful login/register
- Token is removed on logout

## Google OAuth Flow

1. User clicks "Continue with Google"
2. App opens browser with Laravel OAuth URL
3. User authenticates with Google
4. Laravel handles callback and generates token
5. Laravel redirects back to app with token in URL: `10alyticsapp:///(tabs)?token={token}`
6. App extracts token and stores it
7. App fetches user data using the token

## Testing

1. Ensure your Laravel API is running on `http://localhost:8000`
2. Update `.env` with your API URL
3. Test email/password login
4. Test email/password registration
5. Test Google OAuth (requires proper Laravel setup)

## Notes

- The app expects Laravel validation error format: `{ message: string, errors?: Record<string, string[]> }`
- User IDs should be returned as strings for consistency
- The app automatically handles token refresh if your Laravel API supports it (you may need to add refresh token logic)
