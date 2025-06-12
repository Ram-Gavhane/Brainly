import { ReactElement } from "react"

interface ButtonProps {
  title?: string;
  variant: "primary" | "secondary" | "onlyIcon";
  size: "sm" | "md" | "lg";
  startSymbol?: ReactElement;
  fun: () => void;
}

const variantStyles = {
  primary: "bg-[#160C28] text-[#EFCB68]",
  secondary: "text-[#160C28] bg-[#EFCB68]",
  onlyIcon: "text-gray-600 bg-transparent"
};

const sizeStyles = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-5 text-base",
  lg: "h-12 px-6 text-lg"
};

export function Button({
  title,
  variant,
  size,
  startSymbol,
  fun
}: ButtonProps) {
  const isOnlyIcon = variant === "onlyIcon";

  return (
    <button
      onClick={fun}
      className={`flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 
        ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {startSymbol && (
        <span className="flex items-center justify-center">
          {startSymbol}
        </span>
      )}
      {!isOnlyIcon && <span>{title}</span>}
    </button>
  );
}
