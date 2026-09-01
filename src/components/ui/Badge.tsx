interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "accent";
  className?: string;
}

const variantStyles = {
  default: "bg-badge-bg text-deep-rose",
  outline: "bg-white border border-soft-pink text-plum",
  accent: "bg-soft-pink text-deep-rose",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 text-xs font-medium rounded-full
        transition-colors duration-200
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
