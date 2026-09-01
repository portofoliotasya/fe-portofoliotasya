import { apiClient, parseApiError } from "@/lib/api-client";
import { MOCK_PROJECTS } from "@/data/mock-projects";
import type { Project, ProjectInput } from "@/types/api";

export const projectService = {
  async getAll(): Promise<Project[]> {
    try {
      const response = await apiClient.get<Project[]>("/api/projects");
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return MOCK_PROJECTS;
    } catch {
      // Fallback to local mock data if backend has no records or is unreachable
      return MOCK_PROJECTS;
    }
  },

  async getById(id: string): Promise<Project> {
    try {
      const response = await apiClient.get<Project>(`/api/projects/${id}`);
      return response.data;
    } catch {
      const found = MOCK_PROJECTS.find((p) => p.id === id);
      if (found) return found;
      throw new Error("Project not found");
    }
  },

  async create(data: ProjectInput): Promise<Project> {
    try {
      const response = await apiClient.post<Project>("/api/projects", data);
      return response.data;
    } catch (error) {
      throw new Error(parseApiError(error));
    }
  },

  async update(id: string, data: ProjectInput): Promise<Project> {
    try {
      const response = await apiClient.put<Project>(
        `/api/projects/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(parseApiError(error));
    }
  },

  async delete(id: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.delete<{ message: string }>(
        `/api/projects/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(parseApiError(error));
    }
  },
};
