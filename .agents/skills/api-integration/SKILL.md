---
name: api-integration
description: >-
  Use this skill when implementing backend API integrations, data fetching, mutations,
  and error handling based on the OpenAPI 3.0.3 specification for Tasya Portfolio.
---

# Backend API Integration Skill

This skill provides step-by-step guidance and type contracts for integrating the frontend with the Tasya Portfolio Backend API, as specified in `docs/openapi.yaml`.

---

## 1. Environment Configurations

Define the base URL in `.env.local` or environment configs:

```bash
# Production Backend (Railway)
NEXT_PUBLIC_API_URL=https://be-portofoliotasya-production.up.railway.app

# Local Development Server
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 2. API Contract Endpoints Summary

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | No | Authenticate admin, returns JWT token. |
| `GET` | `/api/projects` | No | Fetch published projects list. |
| `POST` | `/api/projects` | Bearer JWT | Create new project. |
| `GET` | `/api/projects/{id}` | No | Fetch single project deep-dive details. |
| `PUT` | `/api/projects/{id}` | Bearer JWT | Update existing project details. |
| `DELETE` | `/api/projects/{id}` | Bearer JWT | Soft-delete project by ID. |
| `POST` | `/api/media/upload` | Bearer JWT | Upload image/thumbnail (`multipart/form-data`). |
| `POST` | `/api/inquiries` | No | Submit project inquiry / contact form. |
| `GET` | `/api/inquiries` | Bearer JWT | Fetch list of all contact inquiries. |

---

## 3. TypeScript Interfaces

```typescript
// Error Response Model
export interface ErrorDetail {
  path: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  errors?: ErrorDetail[];
}

// Project Model
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

// Inquiry Model
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

// Media Upload Response
export interface MediaUploadResponse {
  url: string;
}

// Auth Login Response
export interface LoginResponse {
  token: string;
}
```

---

## 4. API Client Implementation Pattern

Create a centralized API client with automatic Bearer token injection and consistent error extraction:

```typescript
import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Helper for extracting API Error Messages
export function parseApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ErrorResponse;
    if (data?.errors && data.errors.length > 0) {
      return data.errors.map(e => `${e.path}: ${e.message}`).join(', ');
    }
    return data?.message || error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}
```

---

## 5. Media Upload Integration Procedure

When uploading media in `/api/media/upload`:
1. Use `FormData` object with field name `file`.
2. Do not set manually `Content-Type: application/json` (let the client set `multipart/form-data; boundary=...`).
3. Handle file upload response `{ url: string }` and immediately bind the URL into the `ProjectInput.thumbnail`.

```typescript
export async function uploadMedia(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<MediaUploadResponse>('/api/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.url;
}
```
