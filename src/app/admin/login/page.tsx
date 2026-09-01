"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { authService } from "@/services";

export default function AdminLoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      await authService.login(data);
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Invalid credentials. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-subtle flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to Home Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-slate hover:text-dark-slate transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link
            href="/"
            className="text-3xl font-extrabold text-deep-rose tracking-tight"
          >
            Tasya
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-dark-slate">
            Admin CMS Portal
          </h1>
          <p className="mt-2 text-sm text-muted-slate">
            Sign in to manage projects and review client inquiries.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-xl border border-border-soft rounded-3xl sm:px-10">
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-dark-slate mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-slate">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@tasya.design"
                    {...register("email")}
                    className={`
                      w-full pl-10 pr-4 py-2.5 text-sm text-dark-slate
                      bg-white border rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
                      transition-all duration-200
                      ${errors.email ? "border-red-400" : "border-border-soft"}
                    `}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-dark-slate mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-slate">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...register("password")}
                    className={`
                      w-full pl-10 pr-4 py-2.5 text-sm text-dark-slate
                      bg-white border rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
                      transition-all duration-200
                      ${errors.password ? "border-red-400" : "border-border-soft"}
                    `}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    w-full flex justify-center items-center gap-2
                    py-3 px-4 text-sm font-semibold text-white
                    bg-plum hover:bg-deep-rose
                    rounded-xl shadow-md hover:shadow-lg
                    transition-all duration-200 active:scale-[0.98]
                    disabled:opacity-60 disabled:cursor-not-allowed
                    cursor-pointer
                  "
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
