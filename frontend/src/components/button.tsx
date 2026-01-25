import { ReactElement } from "react"

interface ButtonProps {
  title?: string;
  variant: "primary" | "secondary" | "onlyIcon" | "selected" | "outline" | "ghost";
  size: "sm" | "md" | "lg";
  startSymbol?: ReactElement;
  fun: () => void;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: "bg-[#EFCB68] text-[#160C28] hover:bg-[#EFCB68]/90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
  secondary: "bg-[#160C28] text-[#EFCB68] hover:bg-[#160C28]/80 shadow-md hover:shadow-lg hover:-translate-y-0.5",
  outline: "bg-transparent border-2 border-[#EFCB68] text-[#EFCB68] hover:bg-[#EFCB68]/10",
  ghost: "bg-transparent text-[#EFCB68] hover:bg-[#EFCB68]/10",
  onlyIcon: "text-[#160C28] bg-transparent hover:bg-black/5",
  selected: "text-[#160C28] bg-[#EFCB68] border-[#160C28] border"
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
  fun,
  fullWidth
}: ButtonProps) {
  const isOnlyIcon = variant === "onlyIcon";

  return (
    <button
      onClick={fun}
      className={`
        flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 active:scale-95
        ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''}
      `}
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
