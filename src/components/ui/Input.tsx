"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className = "", ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-dark-slate"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2.5 text-sm text-dark-slate
            bg-white border border-border-soft rounded-xl
            placeholder:text-muted-slate/60
            focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
            transition-all duration-200
            disabled:bg-bg-subtle disabled:cursor-not-allowed disabled:opacity-60
            ${error ? "border-red-400 focus:ring-red-300/30 focus:border-red-400" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 mt-0.5 animate-fade-in">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs text-muted-slate">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
