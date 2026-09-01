import { apiClient, parseApiError } from "@/lib/api-client";
import type { Inquiry, InquiryInput } from "@/types/api";

export const inquiryService = {
  async submit(data: InquiryInput): Promise<Inquiry> {
    try {
      const response = await apiClient.post<Inquiry>("/api/inquiries", data);
      return response.data;
    } catch (error) {
      throw new Error(parseApiError(error));
    }
  },

  async getAll(): Promise<Inquiry[]> {
    try {
      const response = await apiClient.get<Inquiry[]>("/api/inquiries");
      return response.data;
    } catch (error) {
      throw new Error(parseApiError(error));
    }
  },
};
