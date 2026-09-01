"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2 } from "lucide-react";
import { inquirySchema, type InquiryFormData } from "@/lib/validations";
import { apiClient, parseApiError } from "@/lib/api-client";
import { useToast } from "@/components/ui/Toast";

const projectTypeOptions = [
  { value: "Web Application Development", label: "Web Application Development" },
  { value: "Mobile App Development", label: "Mobile App Development" },
  { value: "UI/UX Design & Prototyping", label: "UI/UX Design & Prototyping" },
  { value: "Brand Identity & Design System", label: "Brand Identity & Design System" },
];

const budgetRangeOptions = [
  { value: "< $5,000", label: "< $5,000" },
  { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
  { value: "$10,000 - $25,000", label: "$10,000 - $25,000" },
  { value: "> $25,000", label: "> $25,000" },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      company: "",
      projectType: "",
      budgetRange: "",
      description: "",
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    // Honeypot bot protection: if filled, silently reject
    if (honeypot) {
      showToast("Thank you for your message!", "success");
      reset();
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post("/api/inquiries", data);
      showToast("Your message has been sent successfully! Tasya will be in touch soon.", "success");
      reset();
    } catch (err) {
      const errorMsg = parseApiError(err);
      showToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Invisible Honeypot field for spam prevention */}
      <input
        type="text"
        name="website_url"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-dark-slate mb-1.5"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`
              w-full px-4 py-2.5 text-sm text-dark-slate
              bg-white border rounded-xl
              focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
              transition-all duration-200
              ${errors.name ? "border-red-400" : "border-border-soft"}
            `}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-dark-slate mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`
              w-full px-4 py-2.5 text-sm text-dark-slate
              bg-white border rounded-xl
              focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
              transition-all duration-200
              ${errors.email ? "border-red-400" : "border-border-soft"}
            `}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: WhatsApp (Optional) & Company (Optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="whatsapp"
            className="block text-sm font-medium text-dark-slate mb-1.5"
          >
            WhatsApp (Optional)
          </label>
          <input
            id="whatsapp"
            type="tel"
            placeholder="+628123456789"
            {...register("whatsapp")}
            className={`
              w-full px-4 py-2.5 text-sm text-dark-slate
              bg-white border rounded-xl
              placeholder:text-muted-slate/50
              focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
              transition-all duration-200
              ${errors.whatsapp ? "border-red-400" : "border-border-soft"}
            `}
          />
          {errors.whatsapp && (
            <p className="text-xs text-red-500 mt-1">
              {errors.whatsapp.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-dark-slate mb-1.5"
          >
            Company (Optional)
          </label>
          <input
            id="company"
            type="text"
            placeholder="Acme Corp"
            {...register("company")}
            className="
              w-full px-4 py-2.5 text-sm text-dark-slate
              bg-white border border-border-soft rounded-xl
              placeholder:text-muted-slate/50
              focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
              transition-all duration-200
            "
          />
        </div>
      </div>

      {/* Row 3: Project Type & Estimated Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="projectType"
            className="block text-sm font-medium text-dark-slate mb-1.5"
          >
            Project Type
          </label>
          <div className="relative">
            <select
              id="projectType"
              {...register("projectType")}
              className={`
                w-full px-4 py-2.5 text-sm text-dark-slate
                bg-white border rounded-xl appearance-none cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
                transition-all duration-200
                ${errors.projectType ? "border-red-400" : "border-border-soft"}
              `}
            >
              <option value="">Select an option</option>
              {projectTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-slate">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.projectType && (
            <p className="text-xs text-red-500 mt-1">
              {errors.projectType.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="budgetRange"
            className="block text-sm font-medium text-dark-slate mb-1.5"
          >
            Estimated Budget
          </label>
          <div className="relative">
            <select
              id="budgetRange"
              {...register("budgetRange")}
              className={`
                w-full px-4 py-2.5 text-sm text-dark-slate
                bg-white border rounded-xl appearance-none cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
                transition-all duration-200
                ${errors.budgetRange ? "border-red-400" : "border-border-soft"}
              `}
            >
              <option value="">Select an option</option>
              {budgetRangeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-slate">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.budgetRange && (
            <p className="text-xs text-red-500 mt-1">
              {errors.budgetRange.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 4: Project Details */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-dark-slate mb-1.5"
        >
          Project Details
        </label>
        <textarea
          id="description"
          rows={5}
          {...register("description")}
          className={`
            w-full px-4 py-3 text-sm text-dark-slate
            bg-white border rounded-xl resize-none
            focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
            transition-all duration-200
            ${errors.description ? "border-red-400" : "border-border-soft"}
          `}
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit Button aligned to bottom right matching Mockup 1 */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex items-center justify-center gap-2
            px-8 py-3 text-sm font-semibold text-white
            bg-gradient-to-r from-[#E85A70] to-[#DF4360]
            hover:from-[#DF4360] hover:to-[#C93350]
            rounded-full shadow-md hover:shadow-lg
            active:scale-[0.98] transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
