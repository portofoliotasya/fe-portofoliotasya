import { describe, it, expect } from "vitest";
import {
  inquirySchema,
  loginSchema,
  projectSchema,
  validateUploadFile,
} from "@/lib/validations";

describe("Validation Schemas & Security Checks", () => {
  describe("inquirySchema", () => {
    it("validates valid inquiry input", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        whatsapp: "+628123456789",
        company: "Acme Corp",
        projectType: "Web Application Development",
        budgetRange: "$5,000 - $10,000",
        description: "We would like to revamp our customer portal website.",
      };
      const result = inquirySchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("rejects invalid email", () => {
      const invalidData = {
        name: "John Doe",
        email: "not-an-email",
        projectType: "UI/UX Design",
        budgetRange: "< $5,000",
        description: "This is a detailed description of the project.",
      };
      const result = inquirySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("valid email");
      }
    });

    it("rejects short descriptions less than 10 characters", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        projectType: "UI/UX Design",
        budgetRange: "< $5,000",
        description: "Too short",
      };
      const result = inquirySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("loginSchema", () => {
    it("validates correct login credentials format", () => {
      const result = loginSchema.safeParse({
        email: "admin@tasya.design",
        password: "supersecurepassword123",
      });
      expect(result.success).toBe(true);
    });

    it("rejects short password under 6 characters", () => {
      const result = loginSchema.safeParse({
        email: "admin@tasya.design",
        password: "123",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("projectSchema", () => {
    it("validates complete project data", () => {
      const result = projectSchema.safeParse({
        title: "Fintech App",
        description: "Comprehensive financial dashboard with live charts.",
        thumbnail: "https://supabase.co/storage/v1/object/public/images/fintech.jpg",
        techStack: ["Figma", "Tailwind", "Next.js"],
        demoUrl: "https://demo.example.com",
        repoUrl: "https://github.com/example/repo",
      });
      expect(result.success).toBe(true);
    });

    it("rejects empty tech stack array", () => {
      const result = projectSchema.safeParse({
        title: "Fintech App",
        description: "Comprehensive financial dashboard with live charts.",
        thumbnail: "https://supabase.co/storage/v1/object/public/images/fintech.jpg",
        techStack: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe("validateUploadFile", () => {
    it("accepts valid JPEG, PNG, and WebP files under 5MB", () => {
      const jpegFile = new File(["dummy content"], "photo.jpg", {
        type: "image/jpeg",
      });
      const pngFile = new File(["dummy content"], "logo.png", {
        type: "image/png",
      });
      const webpFile = new File(["dummy content"], "hero.webp", {
        type: "image/webp",
      });

      expect(validateUploadFile(jpegFile).valid).toBe(true);
      expect(validateUploadFile(pngFile).valid).toBe(true);
      expect(validateUploadFile(webpFile).valid).toBe(true);
    });

    it("rejects dangerous or disallowed mime types (e.g. SVG / executables)", () => {
      const svgFile = new File(["<svg></svg>"], "icon.svg", {
        type: "image/svg+xml",
      });
      const exeFile = new File(["binary"], "script.exe", {
        type: "application/x-msdownload",
      });

      expect(validateUploadFile(svgFile).valid).toBe(false);
      expect(validateUploadFile(exeFile).valid).toBe(false);
    });

    it("rejects files larger than 5MB", () => {
      const largeContent = new Uint8Array(6 * 1024 * 1024); // 6MB
      const largeFile = new File([largeContent], "huge.jpg", {
        type: "image/jpeg",
      });
      const result = validateUploadFile(largeFile);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("5MB");
    });
  });
});
