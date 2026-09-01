import { z } from "zod";

/* ===== Contact / Inquiry Form Schema ===== */
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  whatsapp: z
    .string()
    .trim()
    .regex(
      /^(\+62|62|0)?[0-9]{8,15}$/,
      "Please enter a valid phone number"
    )
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(100, "Company name must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  projectType: z
    .string()
    .min(1, "Please select a project type"),
  budgetRange: z
    .string()
    .min(1, "Please select an estimated budget"),
  description: z
    .string()
    .trim()
    .min(10, "Please describe your project in at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters"),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

/* ===== Admin Login Schema ===== */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/* ===== Project Form Schema ===== */
export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 200 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters"),
  goal: z.string().trim().optional().or(z.literal("")),
  challenges: z.string().trim().optional().or(z.literal("")),
  role: z.string().trim().optional().or(z.literal("")),
  thumbnail: z
    .string()
    .url("Please provide a valid thumbnail URL"),
  techStack: z
    .array(z.string().trim().min(1))
    .min(1, "At least one tech stack item is required"),
  demoUrl: z.string().url("Please provide a valid URL").optional().or(z.literal("")),
  repoUrl: z.string().url("Please provide a valid URL").optional().or(z.literal("")),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

/* ===== File Upload Validation ===== */
export function validateUploadFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Only JPG, PNG, and WebP images are allowed.",
    };
  }
  if (file.size > maxSizeInBytes) {
    return { valid: false, error: "File size must not exceed 5MB." };
  }
  return { valid: true };
}
