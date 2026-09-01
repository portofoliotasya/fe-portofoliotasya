/* ===== API Types — Generated from docs/openapi.yaml ===== */

// Error Response
export interface ErrorDetail {
  path: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  errors?: ErrorDetail[];
}

// Project
export interface Project {
  id: string;
  title: string;
  description: string;
  goal?: string | null;
  challenges?: string | null;
  role?: string | null;
  thumbnail: string;
  techStack: string[];
  demoUrl?: string | null;
  repoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface ProjectInput {
  title: string;
  description: string;
  goal?: string;
  challenges?: string;
  role?: string;
  thumbnail: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
}

// Inquiry
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  whatsapp?: string | null;
  company?: string | null;
  projectType: string;
  budgetRange: string;
  description: string;
  createdAt: string;
}

export interface InquiryInput {
  name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  projectType: string;
  budgetRange: string;
  description: string;
}

// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// Media Upload
export interface MediaUploadResponse {
  url: string;
}
