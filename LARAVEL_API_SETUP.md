# Laravel API Integration Guide

This app is configured to work with a Laravel API backend. Here's what you need to set up on your Laravel side.

## Required Laravel API Endpoints

Your Laravel API should implement the following endpoints:

### 1. Email/Password Login
**POST** `/api/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "user@example.com",
    "image": "https://example.com/avatar.jpg" // optional
  },
  "token": "your-jwt-token-here",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

**Error Response (422 or 401):**
```json
{
  "message": "Invalid credentials",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password field is required."]
  }
}
```

### 2. Email/Password Registration
**POST** `/api/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "user@example.com",
    "image": null
  },
  "token": "your-jwt-token-here",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

**Error Response (422):**
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

### 3. Get Current User
**GET** `/api/user`

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "user@example.com",
  "image": "https://example.com/avatar.jpg"
}
```

**Error Response (401):**
```json
{
  "message": "Unauthenticated"
}
```

### 4. Logout
**POST** `/api/logout`

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "message": "Successfully logged out"
}
```

### 5. Google OAuth

#### Initiate OAuth
**GET** `/auth/google?redirect_uri={encoded_redirect_uri}`

This should redirect to Google's OAuth consent screen.

#### OAuth Callback
After Google authentication, your Laravel backend should:
1. Handle the OAuth callback from Google
2. Create or find the user
3. Generate a JWT token
4. Redirect back to the mobile app with the token in the URL

**Redirect URL Format:**
```
10alyticsapp:///(tabs)?token={jwt_token}
```

**Or if error:**
```
10alyticsapp:///(tabs)?error={error_message}
```

## Laravel Implementation Example

### Using Laravel Sanctum or Passport

If you're using **Laravel Sanctum**:

```php
// routes/api.php
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
```

```php
// app/Http/Controllers/AuthController.php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('mobile-app')->plainTextToken;

            return response()->json([
                'user' => [
                    'id' => (string) $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'image' => $user->image,
                ],
                'token' => $token,
                'token_type' => 'Bearer',
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('mobile-app')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => (string) $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'image' => $user->image,
            ],
            'token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function user(Request $request)
    {
        return response()->json([
            'id' => (string) $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'image' => $request->user()->image,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }
}
```

### Google OAuth Implementation

For Google OAuth, you can use Laravel Socialite:

```php
// Install Laravel Socialite
composer require laravel/socialite

// routes/web.php
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);
```

```php
// app/Http/Controllers/AuthController.php
use Laravel\Socialite\Facades\Socialite;

public function redirectToGoogle(Request $request)
{
    $redirectUri = $request->query('redirect_uri');
    session(['redirect_uri' => $redirectUri]);
    
    return Socialite::driver('google')
        ->redirect();
}

public function handleGoogleCallback()
{
    try {
        $googleUser = Socialite::driver('google')->user();
        $redirectUri = session('redirect_uri', '10alyticsapp:///(tabs)');
        
        // Find or create user
        $user = User::firstOrCreate(
            ['email' => $googleUser->email],
            [
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'image' => $googleUser->avatar,
                'email_verified_at' => now(),
            ]
        );

        // Generate token
        $token = $user->createToken('mobile-app')->plainTextToken;
        
        // Redirect back to app with token
        return redirect($redirectUri . '?token=' . urlencode($token));
    } catch (\Exception $e) {
        $redirectUri = session('redirect_uri', '10alyticsapp:///(tabs)');
        return redirect($redirectUri . '?error=' . urlencode('Authentication failed'));
    }
}
```

## Environment Configuration

### Mobile App (.env)
```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api
```

### Laravel (.env)
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

## CORS Configuration

Make sure your Laravel API allows requests from your mobile app:

```php
// config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['*'], // In production, specify your app's origin
'allowed_headers' => ['*'],
'allowed_methods' => ['*'],
'supports_credentials' => true,
```

Or in `bootstrap/app.php` (Laravel 11+):
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->api(prepend: [
        \Illuminate\Http\Middleware\HandleCors::class,
    ]);
})
```

## Testing

1. Start your Laravel API server:
```bash
php artisan serve
```

2. Update `.env` in the mobile app:
```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api
```

3. Test the endpoints using Postman or curl before testing in the app.

## Notes

- The app expects JWT tokens in the `token` field of login/register responses
- Tokens are stored securely using Expo SecureStore
- The `Authorization: Bearer {token}` header is automatically added to authenticated requests
- User IDs should be returned as strings (not integers) for consistency
- Google OAuth redirects back to the app using the deep link scheme `10alyticsapp://`
