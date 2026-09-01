import { describe, it, expect } from "vitest";
import { parseApiError } from "@/lib/api-client";
import { AxiosError, AxiosResponse } from "axios";
import type { ErrorResponse } from "@/types/api";

describe("API Client Error Parser", () => {
  it("formats structured field errors from backend ErrorResponse", () => {
    const mockErrorResponse: ErrorResponse = {
      message: "Validation failed",
      errors: [
        { path: "email", message: "Invalid email format" },
        { path: "description", message: "Description too short" },
      ],
    };

    const axiosError = new AxiosError(
      "Bad Request",
      "ERR_BAD_REQUEST",
      undefined,
      undefined,
      {
        data: mockErrorResponse,
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {} as any,
      } as AxiosResponse
    );

    const parsed = parseApiError(axiosError);
    expect(parsed).toBe("email: Invalid email format, description: Description too short");
  });

  it("extracts single message from ErrorResponse if no field errors are present", () => {
    const mockErrorResponse: ErrorResponse = {
      message: "Invalid credentials",
    };

    const axiosError = new AxiosError(
      "Unauthorized",
      "ERR_UNAUTHORIZED",
      undefined,
      undefined,
      {
        data: mockErrorResponse,
        status: 401,
        statusText: "Unauthorized",
        headers: {},
        config: {} as any,
      } as AxiosResponse
    );

    const parsed = parseApiError(axiosError);
    expect(parsed).toBe("Invalid credentials");
  });

  it("returns fallback message for non-Axios generic exceptions", () => {
    const parsed = parseApiError(new Error("Network disconnect"));
    expect(parsed).toBe("An unexpected error occurred. Please try again.");
  });
});
