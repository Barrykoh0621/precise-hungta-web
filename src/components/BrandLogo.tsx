import { Link } from "react-router-dom";

interface BrandLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md";
}

const BrandMark = ({ size = "md" }: Pick<BrandLogoProps, "size">) => (
  <div className={size === "sm" ? "w-9 h-9 shrink-0" : "w-11 h-11 shrink-0"}>
    <svg viewBox="0 0 64 64" className="w-full h-full" role="img" aria-label="Hung Ta Instrument logo mark">
      <rect x="4" y="4" width="56" height="56" rx="10" fill="#11294B" />
      <path d="M15 18h34M20 18v28M44 18v28M20 32h24" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <path d="M32 10v10M32 44v10M10 32h10M44 32h10" fill="none" stroke="#D3133D" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="32" r="5" fill="#D3133D" />
    </svg>
  </div>
);

const BrandLogo = ({ variant = "dark", size = "md" }: BrandLogoProps) => {
  const textColor = variant === "light" ? "text-white" : "text-primary";
  const subTextColor = variant === "light" ? "text-white/58" : "text-primary/55";
  const titleSize = size === "sm" ? "text-base" : "text-lg";

  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Hung Ta Instrument home">
      <BrandMark size={size} />
      <span className="leading-none">
        <span className={`${textColor} ${titleSize} font-black tracking-tight uppercase block`}>
          Hung Ta <span className="text-accent">Instrument</span>
        </span>
        <span className={`${subTextColor} text-[10px] font-bold tracking-[0.22em] uppercase mt-1 block`}>
          Testing Machines
        </span>
      </span>
    </Link>
  );
};

export default BrandLogo;
