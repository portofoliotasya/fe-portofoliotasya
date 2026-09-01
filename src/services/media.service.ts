import { apiClient, parseApiError } from "@/lib/api-client";
import { validateUploadFile } from "@/lib/validations";
import type { MediaUploadResponse } from "@/types/api";

export const mediaService = {
  async upload(file: File): Promise<string> {
    // 1. Client-side security validation
    const validation = validateUploadFile(file);
    if (!validation.valid) {
      throw new Error(validation.error || "Invalid file");
    }

    // 2. Prepare FormData
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await apiClient.post<MediaUploadResponse>(
        "/api/media/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.url;
    } catch (error) {
      throw new Error(parseApiError(error));
    }
  },
};
