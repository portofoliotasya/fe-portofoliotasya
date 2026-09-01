import { apiClient, parseApiError } from "@/lib/api-client";
import type { LoginRequest, LoginResponse } from "@/types/api";

export const authService = {
  async login(credentials: LoginRequest): Promise<string> {
    try {
      const response = await apiClient.post<LoginResponse>(
        "/api/auth/login",
        credentials
      );
      const token = response.data.token;

      // Save token securely in sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_token", token);
        // Set cookie for Next.js proxy route guard (expires in 7 days, SameSite=Lax)
        document.cookie = `admin_token=${token}; path=/; max-age=604800; SameSite=Lax`;
      }

      return token;
    } catch (error) {
      throw new Error(parseApiError(error));
    }
  },

  logout(): void {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_token");
      document.cookie =
        "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      window.location.href = "/admin/login";
    }
  },

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_token");
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
