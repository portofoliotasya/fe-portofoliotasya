"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, options, placeholder = "Select an option", id, className = "", ...props },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-semibold text-dark-slate"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full px-4 py-2.5 text-sm text-dark-slate
              bg-white border border-border-soft rounded-xl
              appearance-none cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent
              transition-all duration-200
              disabled:bg-bg-subtle disabled:cursor-not-allowed disabled:opacity-60
              ${error ? "border-red-400 focus:ring-red-300/30 focus:border-red-400" : ""}
              ${className}
            `}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-slate pointer-events-none" />
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-0.5 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
