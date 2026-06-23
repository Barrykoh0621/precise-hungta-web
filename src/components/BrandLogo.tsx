import { Link } from "react-router-dom";

interface BrandLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md";
}

export const BrandMark = ({ size = "md" }: Pick<BrandLogoProps, "size">) => (
  <div className={size === "sm" ? "w-10 h-10 shrink-0" : "w-12 h-12 shrink-0"}>
    <svg viewBox="0 0 80 80" className="w-full h-full" role="img" aria-label="Hung Ta Instrument gear H logo mark">
      <g fill="#D3133D">
        {Array.from({ length: 16 }).map((_, index) => (
          <rect
            key={index}
            x="36.5"
            y="2"
            width="7"
            height="15"
            rx="1.4"
            transform={`rotate(${index * 22.5} 40 40)`}
          />
        ))}
        <path fillRule="evenodd" d="M40 12a28 28 0 1 1 0 56 28 28 0 0 1 0-56Zm0 10a18 18 0 1 0 0 36 18 18 0 0 0 0-36Z" />
        <rect x="27" y="21" width="9" height="38" rx="1" />
        <rect x="44" y="21" width="9" height="38" rx="1" />
        <rect x="30" y="35" width="20" height="10" rx="1" />
      </g>
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
