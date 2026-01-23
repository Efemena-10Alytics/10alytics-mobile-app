import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";

// Complete the OAuth flow
WebBrowser.maybeCompleteAuthSession();

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  token: string;
  token_type?: string;
  expires_in?: number;
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseURL: string;
  private tokenKey = "auth_token";

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getToken(): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(this.tokenKey);
    }
    return await SecureStore.getItemAsync(this.tokenKey);
  }

  private async setToken(token: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.setItem(this.tokenKey, token);
    } else {
      await SecureStore.setItemAsync(this.tokenKey, token);
    }
  }

  private async removeToken(): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(this.tokenKey);
    } else {
      await SecureStore.deleteItemAsync(this.tokenKey);
    }
  }

  private async getHeaders(includeAuth = true): Promise<HeadersInit> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (includeAuth) {
      const token = await this.getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ data?: T; error?: ApiError }> {
    try {
      // Don't include auth for login/register endpoints
      const shouldIncludeAuth = 
        !endpoint.includes("/login") && 
        !endpoint.includes("/register") &&
        !endpoint.includes("/auth/google");
      
      const headers = await this.getHeaders(shouldIncludeAuth);

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          error: {
            message: responseData.message || "An error occurred",
            errors: responseData.errors,
          },
        };
      }

      // Handle token storage for login/register
      if (
        (endpoint.includes("/login") || endpoint.includes("/register")) &&
        responseData.token
      ) {
        await this.setToken(responseData.token);
      }

      return { data: responseData };
    } catch (error) {
      return {
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Network error. Please check your connection.",
        },
      };
    }
  }

  async login(email: string, password: string): Promise<{
    data?: LoginResponse;
    error?: ApiError;
  }> {
    return this.request<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<{
    data?: LoginResponse;
    error?: ApiError;
  }> {
    return this.request<LoginResponse>("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  async logout(): Promise<{ data?: { message: string }; error?: ApiError }> {
    const result = await this.request("/logout", {
      method: "POST",
    });
    await this.removeToken();
    return result;
  }

  async getCurrentUser(): Promise<{
    data?: LoginResponse["user"];
    error?: ApiError;
  }> {
    return this.request<LoginResponse["user"]>("/user", {
      method: "GET",
    });
  }

  async googleAuth(): Promise<{
    data?: LoginResponse["user"];
    error?: ApiError;
  }> {
    try {
      const redirectUrl = Linking.createURL("/(tabs)", {});
      const authUrl = `${this.baseURL.replace(
        "/api",
        ""
      )}/auth/google?redirect_uri=${encodeURIComponent(redirectUrl)}`;

      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);

      if (result.type === "success" && result.url) {
        try {
          const url = new URL(result.url);
          const token = url.searchParams.get("token");
          const error = url.searchParams.get("error");

          if (error) {
            return {
              error: {
                message: decodeURIComponent(error),
              },
            };
          }

          if (token) {
            await this.setToken(token);
            // Fetch user data after setting token
            const userResult = await this.getCurrentUser();
            if (userResult.data) {
              return { data: userResult.data };
            }
          }
        } catch (urlError) {
          // Handle case where URL might not be parseable
          return {
            error: {
              message: "Failed to process authentication response",
            },
          };
        }
      }

      return {
        error: {
          message: "Authentication was cancelled or failed",
        },
      };
    } catch (error) {
      return {
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Google authentication failed",
        },
      };
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
